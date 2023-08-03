export default function handler(req, res) {
    res.send(`{
        "links": [
            {
                "rel": "http://nodeinfo.diaspora.software/ns/schema/2.0",
                "href": "https://m.eallion.com/nodeinfo/2.0"
            }
        ]
    }`);
}
