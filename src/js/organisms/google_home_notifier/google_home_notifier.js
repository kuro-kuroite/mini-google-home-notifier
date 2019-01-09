import '@babel/polyfill';
import Promise from 'bluebird';
import {
  Client as GoogleCastClient,
  DefaultMediaReceiver,
} from 'castv2-client';
import googleTTS from 'google-tts-api';
import isIp from 'is-ip';
import { createMdnsBrowser } from '../../atoms/mdns';

export default class GoogleHomeNotifier {
  constructor(deviceIdentifier, options = {}) {
    this.device = {};

    if (isIp(deviceIdentifier)) {
      this.device.ip = deviceIdentifier;
    } else {
      this.device.name = deviceIdentifier.replace(' ', '-');
    }
    this.device.identifier = deviceIdentifier;

    this.options = {
      accent: 'en',
      language: 'en',
      timeout: 5000,
      ...options,
    };
  }

  searchDevice(name = this.device.name) {
    // NOTE: devise name has no space bacause it turns into hyphen
    // eslint-disable-next-line no-param-reassign
    name = name.replace(' ', '-');

    return new Promise((resolve, reject) => {
      const browser = createMdnsBrowser();
      browser.start();

      browser.on('serviceUp', service => {
        browser.stop();

        // Only use the first IP addresses in the array
        const address = service.addresses[0];
        console.log(
          `Device ${service.name} at ${address}:${service.port} found`,
        );

        if (service.name.includes(name)) {
          resolve(address);
        } else {
          // HACK: Expected the Promise rejection reason to be an Error
          // eslint-disable-next-line prefer-promise-reject-errors
          reject(`can't search ${name} of device in same network`);
        }
      });

      browser.on('error', err => {
        browser.stop();
        // HACK: Expected the Promise rejection reason to be an Error
        // eslint-disable-next-line prefer-promise-reject-errors
        reject(err);
      });

      setTimeout(() => {
        browser.stop();
        // HACK: Expected the Promise rejection reason to be an Error
        // eslint-disable-next-line prefer-promise-reject-errors
        reject(`.searchDevice(): search timeout`);
      }, this.options.timeout);
    });
  }

  async speak(message, language) {
    if (!message) {
      console.error(`.speak(); The text to speak can't be empty`);
      return false;
    }

    return new Promise((resolve, reject) => {
      googleTTS(message, language || this.options.language, 1, 3000)
        .then(url => {
          this.push(url)
            .then(resolve)
            .catch(reject);
        })
        .catch(reject);
    }).catch(reject => {
      console.log(reject);
    });
  }

  push(url) {
    // HACK: Expected to return a value at the end of async arrow function
    // eslint-disable-next-line consistent-return
    return new Promise(async (resolve, reject) => {
      if (this.device.ip === undefined || !isIp(this.device.ip)) {
        try {
          this.device.ip = await this.searchDevice();
        } catch (err) {
          return reject(err);
        }
      }

      const client = new GoogleCastClient();
      client.connect(
        this.device.ip,
        () => {
          client.launch(DefaultMediaReceiver, (err, player) => {
            const media = {
              contentId: url,
              contentType: 'audio/mp3',
              streamType: 'BUFFERED',
            };

            player.load(media, { autoplay: true }, () => {
              client.close();
              resolve();
              console.log(`Pushed to device at ${this.device.ip}`);
            });
          });
        },
      );

      client.on('error', err => {
        // HACK: Expected the Promise rejection reason to be an Error
        // eslint-disable-next-line prefer-promise-reject-errors
        reject(`Google Cast Client error:\n${err}`);
      });
    });
  }
}
