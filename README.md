# textlint-rule-en-spell

[![textlint rule](https://img.shields.io/badge/textlint-fixable-green.svg?style=social)](https://textlint.github.io/)

A textlint rule to check English spelling. The dictionary is included. 

Input: spall check. auto fix typimg.

```
1:1   error    spall => pall, shall, small, spell, spill, stall  en-spell
1:23  ✓ error  typimg => typing                                  en-spell
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
