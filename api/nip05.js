const PUBKEY = 'fa984bd7dbb282f07e16e7ae87b26a2a7b9b90b7246a44771f0cf5ae58018f52';

const RELAYS = [
  'wss://pyramid.fiatjaf.com',
  'wss://140.f7z.io',
  'wss://r.f7z.io'
];

// NIP-AD: url path -> long-form article (kind:30023) d-tag
const ARTICLES = ['attention', 'memory', 'structure', 'citizens', 'zero'];

export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.setHeader('Access-Control-Allow-Origin', '*');

  const ad = req.query.ad;
  if (ad) {
    const slug = ad.replace(/^\/|\/$/g, '');
    if (ARTICLES.includes(slug)) {
      res.status(200).json({
        [`/${slug}`]: {
          filter: {
            kinds: [30023],
            authors: [PUBKEY],
            '#d': [slug],
            limit: 1
          },
          relays: RELAYS
        }
      });
      return;
    }
    res.status(200).json({});
    return;
  }

  res.status(200).json({
    names: {
      _: PUBKEY,
      replica: '4108cd882d5bd7446b4b5cb0688b14694f3d0dbb52bd24f16e1e29ff1636adab'
    }
  });
}
