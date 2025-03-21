import React from "react";
import unrigLogo from "../assets/unrig-logo.png";
import Button from "./Button";

function Header() {
  return (
<header className="w-full text-white py-4 shadow-lg" style={{ backgroundColor: "#F0F3FF" }}>
  <div className="container mx-auto flex justify-between items-center px-6 text-black">
        {/* Logo */}
          <a className="flex flex-row" href="/">
            <img src={unrigLogo} alt="Unrig Logo" className="h-10 mr-2" />
            <div className="text-2xl font-bold ">Eggconomy</div>
          </a>

        {/* Navigation Menu */}
        <nav className="hidden md:flex space-x-6">
          <Button href={"/"} text={"Join Us"} color={"#F0F3FF"} bgColor={"#5371FF"}/>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="text-white focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
