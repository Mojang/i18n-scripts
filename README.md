# i18n scripts

## Contributing

We are not accepting external contributions at this point in time.

## Prerequisites

To work correctly this package requires a `gettext` installation.

## Install

```console
$ npm i @mojang/i18n-scripts
```

## Scripts
___

### add-missing-en

Adds english default translation using keys in `pot` file as base translation.

__example__

```console
$ add-missing-en
```
___

### merge-translations

Helper function around gettext `msgmerge`.

__example__

```console
$ merge-translations
```
___

### generate-json

Generates json files from `po` files that can be consumed by [Jed](https://github.com/messageformat/Jed).

| flag                          | action                                          |
|-------------------------------|-------------------------------------------------|
| --o (optional)                | When set, sets output file                      |
| --lowercase (optional)        | When set, produces lowercase filename           |
| --escape-percentage (optional)| When set, appends extra percentage sign         |
| --filenamesMap (optional)     | When set, reads file name maps from a json file |

__example__

```console
$ generate-json --lowercase --escape-percentage --filenamesMap ./i18n-map.json
```

__example i18n-map.json__

```json
{
  "zh-CN": ["zh-cn", "zh-hans"],
  "zh-TW": ["zh-tw", "zh-hant"]
}
```
___

## License

[Licensed under MIT license](/LICENSE).