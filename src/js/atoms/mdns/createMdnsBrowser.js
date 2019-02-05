import * as mdns from 'mdns-js';

const createMdnsBrowser = (protocol = 'googlecast') =>
  mdns.createBrowser(mdns.tcp(protocol));

export default createMdnsBrowser;
