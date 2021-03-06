# textlint-rule-en-spell

[![textlint rule](https://img.shields.io/badge/textlint-fixable-green.svg?style=social)](https://textlint.github.io/)

A textlint rule to check English spelling. The dictionary is included. 

```
1:1  ✓ error  typimg => typing                                  en-spell
```

## Install

Install with [npm](https://www.npmjs.com/):

    npm install textlint-rule-en-spell

## Usage

Via `.textlintrc`(Recommended)

```json
{
    "rules": {
        "en-spell": true
    }
}
```

with [TextlintRuleEnSpellOptions](https://github.com/hata6502/textlint-rule-en-spell/blob/master/src/index.ts)

```json
{
    "rules": {
        "en-spell": {
            "personalDictionary": ["foo", "bar/color", "*baz"]
        }
    }
}
```

Via CLI

```
textlint --rule en-spell README.md
```

### Build

Builds source codes for publish to the `lib` folder.
You can write ES2015+ source codes in `src/` folder.

    npm run build

### Tests

Run test code in `test` folder.
Test textlint rule by [textlint-tester](https://github.com/textlint/textlint-tester).

    npm test

## Disclaimer

Please see [DISCLAIMER.md](https://github.com/blue-hood/textlint-rule-en-spell/blob/master/DISCLAIMER.md).

## License

MIT © Hood
