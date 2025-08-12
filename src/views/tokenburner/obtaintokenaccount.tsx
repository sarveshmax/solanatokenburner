import React, { useState } from "react";
import {
  informationBoxStyle,
  informationBoxPrestyle,
  informationBoxStyleCentered,
} from "../informationBoxStyle";

const ObtainTokenAccount = () => {
  return (
    <>
      <h1 className="text-center text-3xl font-semibold text-transparent bg-clip-text bg-[#ffffff]">
        How to Obtain Token Account
      </h1>
      <div
        className="text-center mx-auto"
        style={{ marginTop: "10px", maxWidth: "95%", margin: "auto" }}
      >
        <img
          // src="tokenaccount.png"
          src="instructions.jpg"
          alt="Description"
          style={{
            borderRadius: "5px",
            maxWidth: "100%",
            maxHeight: "400px", // Set the maximum height as per your requirement
            width: "auto", // Maintain aspect ratio
            height: "auto", // Maintain aspect ratio
          }}
        />
        <div style={{ ...informationBoxStyle }}>
          <pre style={{ ...informationBoxPrestyle }}>
            <span style={{ color: "gray", fontStyle: "italic" }}>(or)</span>{" "}
            Automatically Obtain Token Account by using the{" "}
            <a
              href="/"
              style={{ textDecoration: "underline", color: "inherit" }}
            >
              🔥 - One-Click Burner
            </a>
          </pre>
        </div>

        <br />
      </div>
    </>
  );
};

export default ObtainTokenAccount;
