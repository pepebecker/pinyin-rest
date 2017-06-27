# Pinyin Rest

[![dependency status](https://img.shields.io/david/pepebecker/pinyin-rest.svg)](https://david-dm.org/pepebecker/pinyin-rest)
[![dev dependency status](https://img.shields.io/david/dev/pepebecker/pinyin-rest.svg)](https://david-dm.org/pepebecker/pinyin-rest#info=devDependencies)
[![MIT-licensed](https://img.shields.io/github/license/pepebecker/pinyin-rest.svg)](https://opensource.org/licenses/MIT)
[![chat on gitter](https://badges.gitter.im/pepebecker.svg)](https://gitter.im/pepebecker)

## Install

```shell
npm install pepebecker/pinyin-rest
```

## `GET /pinyin/...`

### Examples

```shell
GET: https://pinyin-rest.pepebecker.com/pinyin/我的猫喜欢喝牛奶
=> wǒ de māo xǐ huān hē niú nǎi
```

```shell
GET: https://pinyin-rest.pepebecker.com/pinyin/wo3 xi3huan1 he1 cha2
=> wǒ xǐhuān hē chá
```

```shell
GET: https://pinyin-rest.pepebecker.com/pinyin/wǒ xǐhuān hēchá?keepSpaces=true'
=> wo3 xi3huan1 he1 cha2
```

```shell
GET: https://pinyin-rest.pepebecker.com/pinyin/woxihuanhecha?split=true
=> ["wo", "xi", "huan", "he", "cha"]
```

## `GET /hanzi/...`

### Examples

```shell
GET: https://pinyin-rest.pepebecker.com/hanzi/喜
=> [
    {
     "hanzi": "喜",
     "pinyin": ["xǐ", "xī", "chì"],
     "cangjie": "GRTR",
     "cangjie2": "土口廿口",
     "strokes": "12",
     "frequency": "2",
     "definition": "like, love, enjoy; joyful thing"
    }
   ]
```

## Related

- [`pinyin-utils`](https://github.com/pepebecker/pinyin-utils)
- [`pinyin-split`](https://github.com/pepebecker/pinyin-split)
- [`find-hanzi`](https://github.com/pepebecker/find-hanzi)
- [`hsk-words`](https://github.com/pepebecker/hsk-words)
- [`pinyin-or-hanzi`](https://github.com/pepebecker/pinyin-or-hanzi)
- [`hanzi-to-pinyin`](https://github.com/pepebecker/hanzi-to-pinyin)
- [`pinyin-convert`](https://github.com/pepebecker/pinyin-convert)
- [`pinyin-api`](https://github.com/pepebecker/pinyin-api)
- [`pinyin-bot-core`](https://github.com/pepebecker/pinyin-bot-core)
- [`pinyin-telegram`](https://github.com/pepebecker/pinyin-telegram)
- [`pinyin-messenger`](https://github.com/pepebecker/pinyin-messenger)

## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/pepebecker/pinyin-rest/issues).