import React from "react";
import FAQ from "../components/FAQ";

const Footer = () => {
  return (
    <footer className="bg-black rounded-lg w-full shadow m-0">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py">
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          Burning tokens is a permanent action. Ensure you are burning the right
          assets.
        </span>

        {/* GREY LINE SEPERATOR */}
        <hr className="my-3 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-3" />

        {/* © 2025 SOLTOKENBURNER - BRANDING */}
        {/* <div className="sm:flex sm:items-center sm:justify-between"> */}
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © {new Date().getFullYear()}{" "}
          <a href="https://soltokenburner.com/" className="hover:underline">
            SolTokenBurner
          </a>
        </span>

        {/* </div> */}
      </div>
    </footer>
  );
};

export default Footer;
