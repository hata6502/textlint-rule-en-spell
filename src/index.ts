import { TextlintRuleModule, TextlintRuleReporter } from "@textlint/types";
import aff from 'dictionary-en/index.aff';
import dic from 'dictionary-en/index.dic';
// @ts-ignore
import nspell from 'nspell';
import urlRegex from 'url-regex';

const spell = nspell(aff, dic);

const reporter: TextlintRuleReporter = (context) => {
  const { fixer, getSource, report, RuleError, Syntax } = context;

  return {
    [Syntax.Str](node) {
      let text = getSource(node);

      text.match(urlRegex())?.forEach(match => {
        text = text.replace(match, ' '.repeat(match.length));
      });

      const regex = /[a-zA-Z][a-zA-Z0-9]*/g;
      let word;

      while (word = regex.exec(text)) {
        const suggest = spell.suggest(word[0]);

        if (suggest.length !== 1) {
          continue;
        }

        const ruleError = new RuleError(`${word[0]} => ${suggest.join(', ')}`, {
          index: word.index,
          fix: fixer.replaceTextRange([word.index, word.index + word[0].length], suggest[0])
            || undefined
        });

        report(node, ruleError);
      }
    }
  }
};

const module: TextlintRuleModule = {
  fixer: reporter,
  linter: reporter
};

export default module;
