import { GoogleHomeNotifier } from 'mini-google-home-notifier';

const options = {
  language: 'ja',
};

const myHome = new GoogleHomeNotifier('192.168.10.151', options);

myHome.speak('こんにちは');
