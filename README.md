# Pinyin REST

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
=> {
     "text": "wǒ de māo xǐhuan hē niúnǎi",
     "data": ["wǒ ", ["de",  "dī",  "dí",  "dì"], " māo xǐhuan ", ["hē", "hè"], " niúnǎi"]
   }
```

```shell
GET: https://pinyin-rest.pepebecker.com/pinyin/wo3 xi3huan1 he1 cha2
=> {
     "text": "wǒ xǐhuān hē chá",
     "data": "wǒ xǐhuān hē chá"
   }
```

```shell
GET: https://pinyin-rest.pepebecker.com/pinyin/woxihuanhecha?split=true
=> {
     "text": "wo xi huan he cha",
     "data": ["wo", "xi", "huan", "he", "cha"]
   }
```

## `GET /definition/...`

### Example

```shell
GET: https://pinyin-rest.pepebecker.com/definition/的
=> {
     "de5": [
       "of",
       "~'s (possessive particle)",
       "(used after an attribute)",
       "(used to form a nominal expression)",
       "(used at the end of a declarative sentence for emphasis)"
     ],
     "di1": [
       "see 的士[di1 shi4]"
     ],
     "di2": [
       "really and truly"
     ],
     "di4": [
       "aim",
       "clear"
     ]
   }
```

## `GET /hanzi/...`

### Example

```shell
GET: https://pinyin-rest.pepebecker.com/hanzi/苹果
=> {
     "traditional": "蘋果",
     "simplified": "苹果",
     "data": {
       "ping2 guo3": {
         "mandarin": "píng guǒ",
         "definitions": [
           "apple"
         ],
         "classifiers": {
           "ge4": {
             "traditional": "個",
             "simplified": "个",
             "mandarin": "gè",
             "definition": "classifier for people or objects in general"
           },
           "ke1": {
             "traditional": "顆",
             "simplified": "颗",
             "mandarin": "kē",
             "definition": "classifier for small spheres, pearls, corn grains, teeth, hearts, satellites etc"
           }
         }
       }
     }
   }
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
- [`pinyin-line`](https://github.com/pepebecker/pinyin-line)

## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/pepebecker/pinyin-rest/issues).