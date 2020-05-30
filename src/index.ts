import { TextlintRuleModule, TextlintRuleReporter } from "@textlint/types";
import aff from 'dictionary-en/index.aff';
import dic from 'dictionary-en/index.dic';
// @ts-ignore
import nspell from 'nspell';

const spell = nspell(aff, dic);

const reporter: TextlintRuleReporter = (context) => {
  const { fixer, getSource, report, RuleError, Syntax } = context;

  return {
    [Syntax.Str](node) {
      const regex = /[a-zA-Z][a-zA-Z0-9]*/g;
      const text = getSource(node);
      let word;

      while (word = regex.exec(text)) {
        const suggest = spell.suggest(word[0]);

        if (suggest.length === 0) {
          continue;
        }

        const ruleError = new RuleError(`${word[0]} => ${suggest.join(', ')}`, {
          index: word.index,
          fix: fixer.replaceTextRange([word.index, word.index + word[0].length], suggest[0])
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
