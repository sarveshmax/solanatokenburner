import { FC, useEffect, useState } from "react";
import { BurnTokens } from "components/BurnTokens";
import generateStars from "views/starGenerator";
import Footer from "components/Footer";
import LiveTokenBurnerLink from "./livetokenburnerlink";
import VerifyBurn from "./verifyburn";
import {
  informationBoxStyle,
  informationBoxPrestyle,
  informationBoxStyleCentered,
} from "../informationBoxStyle";
import ObtainTokenAccount from "./obtaintokenaccount";
import FAQ from "components/FAQ";

export const TokenBurnerView: FC = ({}) => {
  // BACKGROUND STARS
  useEffect(() => {
    const leftStarPositions = [
      { left: "5%", top: "70%" },
      { left: "10%", top: "20%" },
      { left: "22%", top: "35%" },
    ];
    generateStars("star-container-left", leftStarPositions, { min: 1, max: 5 });
  }, []);

  useEffect(() => {
    const rightStarPositions = [
      { right: "6%", top: "12%" },
      { right: "17%", top: "35%" },
      { right: "23%", top: "58%" },
      { right: "9%", top: "79%" },
    ];
    generateStars("star-container-right", rightStarPositions, {
      min: 1,
      max: 3,
    });
  }, []);

  //MAIN VIEW
  return (
    <div className="md:hero mx-auto p-4">
      {/* BACKGROUND STARS */}
      <div id="star-container-left" className="star-container-left -z-10"></div>
      <div
        id="star-container-right"
        className="star-container-right -z-10"
      ></div>
      <div className="md:hero-content flex flex-col">
        {/* SOLANA TOKEN BURNER - TITLE */}
        <h1 className="text-center text-5xl font-bold text-transparent bg-clip-text bg-[#ffffff]">
          Solana Token Burner
        </h1>

        {/* // NOTICE
        <div style={{ ...informationBoxStyle }}>
          <pre style={{ ...informationBoxPrestyle }}>
            {`When burning tokens worth more than $1, Phantom may display a warning. Choose "Proceed anyway" if you’re certain you’re burning the correct assets.`}
          </pre>
        </div> */}

        {/* NOTE AND INSTRUCTIONS */}
        <div style={{ ...informationBoxStyle }}>
          <pre style={{ ...informationBoxPrestyle }}>
            {`NOTE: This Action Cannot be Reversed
1. Enter the Token Account
2. The Token Address and Decimals will be auto-filled
3. Enter the Amount of Tokens to Burn`}
          </pre>
        </div>

        {/* VIEW LIVE BURNS */}
        {/* <LiveTokenBurnerLink /> */}

        {/* BURN SOLANA SPL OR LP TOKENS - SUBTITLE */}
        <h1 className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#9945FF] to-[#14F195]">
          Burn Solana SPL or LP Tokens
        </h1>

        {/* BURN TOKENS */}
        <div className="text-center" style={{ marginTop: "5px" }}>
          <BurnTokens />
        </div>

        {/* PARTNERSHIP NOTICE */}
        <div className="w-100 flex items-center gap-4 rounded-2xl mt-2 mb-2 p-4 bg-gradient-to-r from-purple-600/20 to-green-500/20 border border-white/20 backdrop-blur-md">
          {/* PHANTOM LOGO FROM PUBLIC FOLDER */}
          <img src="/phantomlogo.png" alt="Phantom Logo" className="w-7 h-7" />

          {/* TEXT */}
          <p className="text-left text-sm font-medium text-white leading-relaxed">
            SolTokenBurner is now a verified partner of Phantom Wallet.
            <br />
            <a
              href="https://phantom.com/apps/soltokenburner"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-xs text-[#14F195] hover:text-white transition break-all"
            >
              https://phantom.com/apps/soltokenburner
            </a>
          </p>
        </div>

        {/* OBTAIN TOKEN ACCOUNT - TUTORIAL */}
        <ObtainTokenAccount />

        {/* VERIFY BURN - TUTORIAL */}
        {/* <VerifyBurn /> */}

        {/* FAQ */}
        <FAQ />

        {/* FOOTER */}
        <br />
        <Footer />
      </div>
    </div>
  );
};
