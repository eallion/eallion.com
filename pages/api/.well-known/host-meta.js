// api/host-meta.js

export default (req, res) => {

    const hostMeta = `
      <?xml version="1.0" encoding="UTF-8"?>
      <XRD xmlns="http://docs.oasis-open.org/ns/xri/xrd-1.0">
        <Link rel="lrdd" type="application/xrd+xml" template="https://example.com/api/webfinger?resource={uri}"/>
      </XRD>
    `;

    res.setHeader('Content-Type', 'application/xrd+xml');
    res.status(200).send(hostMeta);

}
