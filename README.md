## mini-google-home-notifier

google-home-notifier で必要な部分のみを Promise でデコレートしたミニライブラリ

### Installation

```bash
$ yarn add mini-google-home-notifier
```

### Example

```js
// import { GoogleHomeNotifier } from 'mini-google-home-notifier';
const GoogleHomeNotifier = require("google-home-push").GoogleHomeNotifier;

const options = {
  language: 'ja',
};

// Pass the name or IP address of your device
const myHome = new GoogleHomeNotifier('192.168.10.151', options);

myHome.speak('こんにちは');
myHome.push('http://www.ne.jp/asahi/music/myuu/wave/asibue.mp3');
```

### API

#### new GoogleHomeNotifier(deviseIdentifier, [options])

Creates an `instance` of GoogleHomeNotifier

##### deviseIdentifier

Type: `string`

Accepts valid IP addresses or devise name.

##### options

Type: `Object`

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| language | string | `en`  | Default language that would be by the `.speak()` method |
| timeout  | number | `5000` | Duration for device searching in miliseconds |

#### .speak(message, [language])

##### message

Type: `string`

Text that would be notified using the Google TTS

##### language

Type: `string`

Language that would be used to TTS the message.
If one is not passed, then it would fall back to one set in the options.
Pass the `language` options from the [following list](https://cloud.google.com/translate/docs/languages).

#### .push(url)

##### url

Type: `string`

A valid media URL that would be cast

### License

- [MIT](https://github.com/taeukme/google-home-push/blob/master/LICENSE.md)
- [Fork](https://github.com/taeukme/google-home-push/blob/master/README.md)
