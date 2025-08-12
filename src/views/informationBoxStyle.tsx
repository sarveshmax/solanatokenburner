// MONOSPACED INFORMATION TEXTBOX

import { CSSProperties } from "react";

export const informationBoxStyle: CSSProperties = {
  backgroundColor: "#202020",
  padding: "10px",
  borderRadius: "8px",
  width: "90%",
  maxWidth: "800px", // Set your desired maximum width in pixels
  margin: "auto",
  marginTop: "8px",
  marginBottom: "8px",
};

export const informationBoxStyleCentered: CSSProperties = {
  backgroundColor: "#202020",
  padding: "10px",
  borderRadius: "8px",
  width: "80%",
  margin: "auto",
  marginTop: "8px",
  textAlign: "center",
};

export const informationBoxPrestyle: CSSProperties = {
  color: "#fff",
  fontFamily: "monospace",
  whiteSpace: "pre-wrap",
  overflowX: "auto",
};
