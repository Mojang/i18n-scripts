# i18n scripts

## Contributing

We are not accepting external contributions at this point in time.

## Prerequisites

To work correctly this package requires a `gettext` installation.

## Install

`$ npm i @mojang/i18n-scripts`

## Scripts
___

### add-missing-en

Adds english default translation using keys in `pot` file as base translation.

__example__

`$ add-missing-en`
___

### merge-translations

Helper function around gettext `msgmerge`.

__example__

`$ merge-translations`
___

### generate-json

Generates json files from `po` files that can be consumed by [Jed](https://github.com/messageformat/Jed).

| flag                      | action                                          |
|---------------------------|-------------------------------------------------|
| --o (optional)            | When set, sets output file                      |
| --lowercase (optional)    | When set, produces lowercase filename           |
| --filenamesMap (optional) | When set, reads file name maps from a json file |

__example__

`$ generate-json --lowercase --filenamesMap ./i18n-map.json`

__example i18n-map.json__

```
{
  "zh-CN": ["zh-cn", "zh-hans"],
  "zh-TW": ["zh-tw", "zh-hant"]
}
```
___

## Licence

[Licenced under MIT licence](/LICENCE).