import type { NextPage } from "next";
import Head from "next/head";
import { TokenBurnerAllView } from "../views";

const Home: NextPage = (props) => {
  return (
    <div>
<Head>
  <title>Burn Solana SPL & LP Tokens | SOLTOKENBURNER</title>
  <meta
    name="description"
    content="Burn Solana SPL and LP Tokens without any coding! Solana Token Burner!"
  />
  <meta
    name="keywords"
    content="burn solana tokens, burn lp, solana token burner, burn spl tokens, burn tokens solana"
  />

  {/* FAQ Structured Data */}
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Can I burn only a portion of my Solana tokens?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. SOLTOKENBURNER lets you burn any amount of SPL or LP tokens without burning your entire balance."
            }
          },
          {
            "@type": "Question",
            "name": "Is SOLTOKENBURNER safe to use?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. All burns are executed directly on-chain from your connected wallet, with no third-party trust is required."
            }
          }
        ]
      }),
    }}
  />
</Head>

      <TokenBurnerAllView />
    </div>
  );
};

export default Home;
