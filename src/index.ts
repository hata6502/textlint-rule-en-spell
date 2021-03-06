import { TextlintRuleModule, TextlintRuleReporter } from "@textlint/types";
import aff from 'dictionary-en/index.aff';
import dic from 'dictionary-en/index.dic';
// @ts-expect-error
import nspell from 'nspell';
// @ts-expect-error
import urlRegexSafe from 'url-regex-safe';

interface TextlintRuleEnSpellOptions {
  /** https://github.com/wooorm/nspell#nspellpersonaldic */
  personalDictionary: string[];
}

const reporter: TextlintRuleReporter = (context, userOptions) => {
  const { fixer, getSource, report, RuleError, Syntax } = context;

  const options: TextlintRuleEnSpellOptions = {
    personalDictionary: [],
    ...userOptions
  };

  const spell = nspell(aff, dic);

  spell.personal(options.personalDictionary.join('\n'));

  return {
    [Syntax.Str](node) {
      let text = getSource(node);

      text.match(urlRegexSafe())?.forEach(match => {
        text = text.replace(match, ' '.repeat(match.length));
      });

      const regex = /[a-zA-Z][a-zA-Z0-9]*/g;
      let word;

      while (word = regex.exec(text)) {
        const suggest = spell.suggest(word[0]);

        if (suggest.length !== 1) {
          continue;
        }

        const ruleError = new RuleError(`${word[0]} => ${suggest[0]}`, {
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
export type { TextlintRuleEnSpellOptions };
