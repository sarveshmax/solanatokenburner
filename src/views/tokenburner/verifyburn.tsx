import React, { useState } from "react";
import {
  informationBoxStyle,
  informationBoxPrestyle,
  informationBoxStyleCentered,
} from "../informationBoxStyle";

const VerifyBurn = () => {
  return (
    <>
      <h1 className="text-center text-3xl font-semibold text-transparent bg-clip-text bg-[#ffffff]">
        Verify the Burn
      </h1>
      <div style={{ ...informationBoxStyleCentered }}>
        <pre style={{ ...informationBoxPrestyle }}>
          {`1. Select "View advanced transaction details"
2. Ensure that there are only three to four transactions.
3. Confirm the transaction.`}
        </pre>
      </div>
      <div
        className="text-center mx-auto"
        style={{ marginTop: "10px", maxWidth: "95%", margin: "auto" }}
      >
        <img
          src="verify.png"
          alt="Description"
          style={{
            borderRadius: "5px",
            maxWidth: "100%",
            maxHeight: "400px", // Set the maximum height as per your requirement
            width: "auto", // Maintain aspect ratio
            height: "auto", // Maintain aspect ratio
          }}
        />
        <br />
      </div>
    </>
  );
};

export default VerifyBurn;
