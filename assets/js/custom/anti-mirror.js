(function() {
  // Domain whitelist
  var encodedValidDomains = [
    'ZWFsbGlvbi5jb20=',
    'd3d3LmVhbGxpb24uY29t',
    'bG9jYWxob3N0',
    'MTI3LjAuMC4x',
    'MTkyLjE2OC4wLjU=',
    'dGVzdC5lYWxsaW9uLmNvbQ==',
    'YmxvZy5lYWxsaW9uLmNvbQ=='
  ];
  var encodedRedirectUrl = 'aHR0cHM6Ly93d3cuZWFsbGlvbi5jb20=';

  function decodeBase64(encodedStr) {
    return atob(encodedStr);
  }

  var validDomains = encodedValidDomains.map(decodeBase64);
  var redirectUrl = decodeBase64(encodedRedirectUrl);

  var hostname = document.location.hostname;
  if (!validDomains.includes(hostname)) {
    window.location.href = redirectUrl;
  }
})();
