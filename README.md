# Mandarin Rest

[![dependency status](https://img.shields.io/david/pepebecker/mandarin-rest.svg)](https://david-dm.org/pepebecker/mandarin-rest)
[![dev dependency status](https://img.shields.io/david/dev/pepebecker/mandarin-rest.svg)](https://david-dm.org/pepebecker/mandarin-rest#info=devDependencies)
[![MIT-licensed](https://img.shields.io/github/license/pepebecker/mandarin-rest.svg)](https://opensource.org/licenses/MIT)
[![chat on gitter](https://badges.gitter.im/pepebecker.svg)](https://gitter.im/pepebecker)

## Install

```shell
npm install mandarin-rest
```

## `GET /pinyin/...`

### Examples

```shell
curl 'http://mandarin-rest.pepebecker.com/pinyin/我的猫喜欢喝牛奶'
=> wǒ de māo xǐ huān hē niú nǎi
```

```shell
curl 'http://mandarin-rest.pepebecker.com/pinyin/wo3 xi3huan1 he1 cha2'
=> wǒ xǐhuān hē chá
```

```shell
curl 'http://mandarin-rest.pepebecker.com/pinyin/wǒ xǐhuān hē chá'
=> wo3 xi3huan1 he1 cha2
```

```shell
curl 'http://mandarin-rest.pepebecker.com/pinyin/woxihuanhecha?split=true'
=> ["wo", "xi", "huan", "he", "cha"]
```

## `GET /hanzi/...`

### Examples

```shell
curl 'http://mandarin-rest.pepebecker.com/hanzi/喜'
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
- [`hanzi-to-pinyin`](https://github.com/pepebecker/hanzi-to-pinyin)
- [`pinyin-convert`](https://github.com/pepebecker/pinyin-convert)

## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/pepebecker/mandarin-rest/issues).