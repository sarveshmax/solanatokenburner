export async function getServerSideProps({ res }) {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <url>
    <loc>https://www.soltokenburner.com/</loc>
    <lastmod>2025-11-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

  <url>
    <loc>https://www.soltokenburner.com/manual</loc>
    <lastmod>2025-11-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

  <url>
    <loc>https://www.soltokenburner.com/blog/burn-lp-tokens-solana</loc>
    <lastmod>2025-11-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://www.soltokenburner.com/blog/burn-solana-spl-lp-tokens</loc>
    <lastmod>2025-11-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://www.soltokenburner.com/blog/dead-wallet-address-solana</loc>
    <lastmod>2025-11-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://www.soltokenburner.com/blog/sol-incinerator-alternative</loc>
    <lastmod>2025-11-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

</urlset>`;

  res.setHeader("Content-Type", "text/xml");
  res.write(xml);
  res.end();

  return {
    props: {},
  };
}

export default function Sitemap() {
  return null; // this page never renders
}
