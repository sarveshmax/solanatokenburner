export async function getServerSideProps({ res }) {
  const text = `User-agent: *
Allow: /

Sitemap: https://old.soltokenburner.com/sitemap.xml
`;

  res.setHeader("Content-Type", "text/plain");
  res.write(text);
  res.end();

  return {
    props: {},
  };
}

export default function Robots() {
  return null;
}
