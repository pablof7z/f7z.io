export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.setHeader('Access-Control-Allow-Origin', '*');

  res.status(200).json({
    names: {
      _: 'fa984bd7dbb282f07e16e7ae87b26a2a7b9b90b7246a44771f0cf5ae58018f52',
      replica: '4108cd882d5bd7446b4b5cb0688b14694f3d0dbb52bd24f16e1e29ff1636adab'
    }
  });
}
