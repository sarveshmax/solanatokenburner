import { FC, useRef, useEffect } from "react";
import Link from "next/link";

export const ContentContainer: FC = (props) => {
  const drawerRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Function to close the drawer
  const closeDrawer = () => {
    if (drawerRef.current) {
      drawerRef.current.checked = false;
    }
  };

  return (
    <div className="drawer h-52 flex-1">
      <input
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle grow"
        ref={drawerRef}
      />
      <div className="drawer-content items-center">{props.children}</div>

      {/* SideBar / Drawer */}
      <div className="drawer-side">
        {/* Use an onClick event to close the drawer when a link is clicked */}
        <label
          htmlFor="my-drawer"
          className="drawer-overlay"
          onClick={closeDrawer}
        ></label>
        <ul className="menu w-80 overflow-y-auto bg-base-100 p-4">
          <li>
            <Link href="/">
              <a onClick={closeDrawer}>🔥 - One-Click Burner</a>
            </Link>
          </li>
          <li>
            <Link href="/manual">
              <a onClick={closeDrawer}>🔥 - Manual Burner</a>
            </Link>
          </li>
          <br />

          <li>
            <Link href="https://medium.com/@solanasuisolutions/how-to-burn-tokens-on-phantom-solana-token-burner-2025-786819a63dc5">
              <a
                onClick={closeDrawer}
                target="_blank"
                rel="noopener noreferrer"
              >
                🖋️ - Article on How to Use
              </a>
            </Link>
          </li>
          <li>
            <Link href="https://www.youtube.com/watch?v=vBFcFUh5JEM">
              <a
                onClick={closeDrawer}
                target="_blank"
                rel="noopener noreferrer"
              >
                🖥️ - Video Tutorial
              </a>
            </Link>
          </li>
          <br />

          <li>
            <Link href="/blog/burn-solana-spl-lp-tokens">
              <a onClick={closeDrawer}>How to Burn Tokens - Solana</a>
            </Link>
          </li>
          <li>
            <Link href="/blog/burn-lp-tokens-solana">
              <a onClick={closeDrawer}>How to Burn LP - Solana</a>
            </Link>
          </li>
          <li>
            <Link href="/blog/dead-wallet-address-solana">
              <a onClick={closeDrawer}>Solana's Dead Wallet Address</a>
            </Link>
          </li>
          <li>
            <Link href="/blog/sol-incinerator-alternative">
              <a onClick={closeDrawer}>Why SolTokenBurner is the Best</a>
            </Link>
          </li>

          <br />

          <li>
            <Link href="https://soltokenburner.com/">
              <a onClick={closeDrawer}>🏠 - Home</a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
