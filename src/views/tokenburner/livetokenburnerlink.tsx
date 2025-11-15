import React, { useState } from "react";
import { addressToReceiveBurnFees } from "constants/Constants";

const LiveTokenBurnerLink = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleCloseClick = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <div
          style={{
            background: "linear-gradient(to right, #610000, #850000)", // Gradient from dark red to red
            padding: "10px",
            borderRadius: "8px",
            width: "80%",
            margin: "auto",
            marginTop: "8px",
            display: "flex", // Align items horizontally
            justifyContent: "space-between", // Space between items
            alignItems: "center", // Centered vertically
          }}
        >
          <pre
            style={{
              color: "#fff",
              fontFamily: "monospace",
              whiteSpace: "pre-wrap",
              overflowX: "auto",
            }}
          >
            {/* {`🔥 View LIVE LP/SPL Burns done `}
            <a
              href={`https://xray.helius.xyz/account/${addressToReceiveBurnFees}?network=mainnet`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#fff", textDecoration: "underline" }}
            >
              HERE
            </a>{" "}
            <br /> <br /> */}
            {`• Confirm that the URL is https://soltokenburner.com/ to safeguard against potential phishing sites.
• Add our website to your bookmarks.`}
            {/* <br />
            {`• Scroll down to find instructions on verifying the burn transaction before burning.`} */}
          </pre>

          <button
            onClick={handleCloseClick}
            style={{
              border: "none",
              color: "#000",
              fontSize: "16px",
              cursor: "pointer",
              marginRight: "4px",
            }}
          >
            X
          </button>
        </div>
      )}
    </>
  );
};

export default LiveTokenBurnerLink;
