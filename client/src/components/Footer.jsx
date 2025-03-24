import React from 'react'
import brokenEgg from '../assets/broken-egg.png'
import Button from './Button'
import unrigLogo from "../assets/unrig-logo.png"
import x from "../assets/x.png"
import ig from "../assets/ig.png"
import fb from "../assets/fb.png"
import yt from "../assets/yt.png"
import tictok from "../assets/tictok.png"

function Footer() {
  return (
    <footer className="bg-[#E8EA58] text-black px-6 py-12">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-10">
        
        {/* Left Side Content */}
        <div className="flex-1">
          <h2 className="text-4xl font-bold leading-tight mb-4">
            Our Eggconomy is Rigged.
          </h2>
          <p className="mb-6 max-w-md text-lg">
            It’s time to make our economy work for working people — not just corporations and the wealthy few.
          </p>
          <Button href={"/"} text={"Learn More"} color={"black"} bgColor={"black"}/>
          <p className="text-sm mt-4">
            © 2025 Unrig Our Economy. All rights reserved.{' '}
            <a href="/" className="underline">
              Privacy Policy
            </a>
          </p>
        </div>

        {/* Right Side Image and Social Icons */}
        <div className="flex-1 flex flex-col items-center">
          <img src={brokenEgg} alt="Broken Egg" className="w-96 mb-6" />
          
          <div className="flex items-center space-x-4 text-2xl">
            {/* Replace text with actual icons if you have them */}
            <img className="hover:underline cursor-pointer" src={x}></img>
            <img className="hover:underline cursor-pointer" src={fb}></img>
            <img className="hover:underline cursor-pointer" src={ig}></img>
            <img className="hover:underline cursor-pointer" src={yt}></img>
            <img className="hover:underline cursor-pointer" src={tictok}></img>
            <img src={unrigLogo} alt="Unrig Logo" className="w-8 h-8" />
          </div>
        </div>
        
      </div>
    </footer>
  )
}

export default Footer
