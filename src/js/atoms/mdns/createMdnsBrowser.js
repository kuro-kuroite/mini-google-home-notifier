import * as mdns from 'mdns';

const createMdnsBrowser = (protocol = 'googlecast') => {
  const sequence = [
    mdns.rst.DNSServiceResolve(),
    'DNSServiceGetAddrInfo' in mdns.dns_sd
      ? mdns.rst.DNSServiceGetAddrInfo()
      : mdns.rst.getaddrinfo({ families: [4] }),
    mdns.rst.makeAddressesUnique(),
  ];

  return mdns.createBrowser(mdns.tcp(protocol), { resolverSequence: sequence });
};

export default createMdnsBrowser;
