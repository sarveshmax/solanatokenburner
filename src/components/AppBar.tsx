import { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useAutoConnect } from "../contexts/AutoConnectProvider";

export const AppBar: FC = (props) => {
  const { autoConnect, setAutoConnect } = useAutoConnect();
  const router = useRouter();

  return (
    <div>
      {/* NavBar / LOGO & MENU BUTTON */}
      <div className="navbar flex flex-row md:mb-0 shadow-lg bg-neutral text-neutral-content">
        <div className="hidden lg:flex items-center mr-1 ml-0 sm:ml-30 lg:ml-40"></div>

        {/* Menu Button */}
        <div className="navbar-start sm:ml-0">
          <label htmlFor="my-drawer" className="btn btn-ghost btn-square">
            <svg
              className="inline-block h-6 w-6 stroke-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </div>

        {/* NavBar / CENTER BUTTONS */}
        <div className="navbar-center hidden md:flex justify-center ">
          <Link href="/">
            <a
              className={`btn mx-2 ${router.pathname === "/" ? "btn-active" : ""}`}
            >
              🔥 One-Click Burner
            </a>
          </Link>
          <Link href="/manual">
            <a
              className={`btn mx-2 ${router.pathname === "/manual" ? "btn-active" : ""}`}
            >
              🔥 Manual Burner
            </a>
          </Link>
          {/* <Link href="/">
            <a
              className={`btn mx-2 ${router.pathname === "/" ? "btn-active" : ""}`}
            >
              ⚒️ More Tools
            </a>
          </Link> */}
        </div>

        {/* NavBar / WALLET CONNECTOR */}
        <div className="navbar-end mr-0 sm:mr-30 lg:mr-40">
          <div className="dropdown">
            {/* AUTOCONNECT BUTTON */}
            <div tabIndex={0} className="btn btn-square btn-ghost text-right">
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="p-2 shadow menu dropdown-content bg-base-100 rounded-box sm:w-52"
            >
              <li>
                <div className="form-control">
                  <label className="cursor-pointer label">
                    <a>Autoconnect</a>
                    <input
                      type="checkbox"
                      checked={autoConnect}
                      onChange={(e) => setAutoConnect(e.target.checked)}
                      className="toggle"
                    />
                  </label>
                </div>
              </li>
            </ul>
          </div>
          <WalletMultiButton className="btn btn-ghost mr-4" />
        </div>
      </div>
      {props.children}
    </div>
  );
};
