import React from "react";
import brokenEgg from "../assets/broken-egg.png";
import Button from "./Button";
import bsky from "../assets/butterfly.png";
import x from "../assets/x.png";
import ig from "../assets/ig.png";
import fb from "../assets/fb.png";
import yt from "../assets/yt.png";
import tiktok from "../assets/tiktok.png";
import unrigLogo from "../assets/logo-black.png";

function Footer() {
  return (
    <footer className="bg-[#E8EA58] text-[#231F21] px-6 py-24">
<div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-10">
  {/* Left Side: 60% width on large screens */}
  <div className="w-full lg:w-[55%]">
    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[5rem] font-bold mb-6 leading-tight">
      Our Eggconomy is Rigged.
    </h2>
    <p className="mb-6 max-w-md text-lg">
      It’s time to make our economy work for working people — not just
      corporations and the wealthy few.
    </p>

<a
            href={"https://unrigoureconomy.com/"}
  className="inline-block w-full md:w-1/2 text-center leading-[40px] uppercase transition-transform duration-200 hover:scale-105 font-bold"
            style={{
              backgroundColor: "black",
              color: "white",
              border: `3px solid black`,
              boxShadow: `-4px 4px 0 0 black`,

            }}
          >
            Learn More
          </a>

    <p className="text-sm mt-4">
      © 2025 Unrig Our Economy. All rights reserved.
    </p>
  </div>

  {/* Right Side: 40% width on large screens */}
  <div className="w-full lg:w-[45%] flex flex-col items-end justify-center text-right">
    <img src={brokenEgg} alt="Broken Egg" className="w-105 mb-6" />
    <div className="flex justify-end items-center space-x-4 text-2xl">
            <a
              href="https://twitter.com/unrigoureconomy"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8"
            >
              <img
                src={x}
                className="hover:underline cursor-pointer"
                alt="Twitter"
              />
            </a>
            <a
              href="https://www.facebook.com/unrigoureconomy"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8"
            >
              <img
                src={fb}
                className="hover:underline cursor-pointer"
                alt="Facebook"
              />
            </a>
            <a
              href="https://www.instagram.com/unrigoureconomy"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8"
            >
              <img
                src={ig}
                className="hover:underline cursor-pointer"
                alt="Instagram"
              />
            </a>
            <a
              href="https://www.youtube.com/@unrigoureconomy7881"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8"
            >
              <img
                src={yt}
                className="hover:underline cursor-pointer"
                alt="YouTube"
              />
            </a>
            <a
              href="https://www.tiktok.com/@unrigoureconomy?_t=8jJDaPoYwJj&_r=1"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8"
            >
              <img
                src={tiktok}
                className="hover:underline cursor-pointer"
                alt="TikTok"
              />
            </a>
            <a
              href="https://unrigoureconomy.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-24"
            >
              <img
                src={unrigLogo}
                className="hover:underline cursor-pointer"
                alt="unrigLogo"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
