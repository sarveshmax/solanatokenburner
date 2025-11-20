import React, { useState } from "react";

const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full border border-gray-700 rounded-lg p-3 bg-[#0d0d0d]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center text-left text-white"
      >
        <span className="text-sm font-medium">{question}</span>
        <span className="text-gray-400">{open ? "−" : "+"}</span>
      </button>

      <div
        className={`transition-all duration-300 overflow-hidden ${
          open ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-gray-400 text-sm leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

const FAQ = () => {
  return (
    <div className="w-full max-w-2xl mx-auto p-4 mt-10">
      <h3 className="text-xl font-semibold text-white mb-4">FAQ</h3>

      <div className="space-y-3">
        <FAQItem
          question="Can I burn only a portion of my SPL or LP tokens?"
          answer="Yes. SolTokenBurner supports partial burns. Select “Input Amount to Burn,” enter your desired amount, and confirm the transaction."
        />

        <FAQItem
          question="Is burning tokens on Solana permanent?"
          answer="Yes. All burns on Solana are irreversible. Please double-check the token and amount before confirming."
        />

        <FAQItem
          question="How do I verify that my tokens were burned?"
          answer="After completing a burn, go to SolScan and search for your wallet address. Your most recent transaction will display the on-chain burn details."
        />

        <FAQItem
          question="Do I receive my SOL rent back when burning tokens?"
          answer="No. Partial burns do not close your token account, so the associated SOL rent is not refunded."
        />

        <FAQItem
          question="Is SolTokenBurner safe to use?"
          answer="Yes. All burns are executed directly on-chain from your connected wallet, no third-party trust is required."
        />

        <FAQItem
          question="Where can I find a SolTokenBurner tutorial?"
          answer="Tutorials are available in the menu, including both a detailed written guide and a YouTube walkthrough."
        />
      </div>
    </div>
  );
};

export default FAQ;
