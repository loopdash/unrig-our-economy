import React, { useState } from "react";
import unrigLogo from "../assets/unrig-logo.png";

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full text-white py-4 shadow-lg bg-[#E8EA58]">
      <div className="container mx-auto flex justify-between items-center px-6 text-[#231F21]">
        {/* Logo */}
        <a className="flex flex-row items-center" href="/">
          <img src={unrigLogo} alt="Unrig Logo" className="h-10 mr-2" />
          <div className="text-2xl font-bold">Don't Inflate Our Plate</div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6">
          <a href="/search-by-state-fred" className="flex items-center space-x-1 underline underline-offset-4">
            <span>See grocery prices in my state!</span>
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-[#231F21] focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="black"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#E8EA58] px-6 py-4 text-[#231F21]">
          <a href="/search-by-state-fred" className="block py-2 underline underline-offset-4">
            See grocery prices in my state!
          </a>
        </div>
      )}
    </header>
  );
}

export default Header;
