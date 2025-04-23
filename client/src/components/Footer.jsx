import React from 'react'
import brokenEgg from '../assets/broken-egg.png'
import Button from './Button'
import bsky from "../assets/butterfly.png"
import x from "../assets/x.png"
import ig from "../assets/ig.png"
import fb from "../assets/fb.png"
import yt from "../assets/yt.png"
import tiktok from "../assets/tiktok.png"

function Footer() {
  return (
    <footer className="bg-[#E8EA58] text-black px-6 py-24">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-10">
        
        {/* Left Side Content */}
        <div className="flex-1">
          <h2 className="text-4xl font-bold md:text-5xl font-bold mb-6 leading-tight">
            Our Eggconomy is Rigged.
          </h2>
          <p className="mb-6 max-w-md text-lg">
            It’s time to make our economy work for working people — not just corporations and the wealthy few.
          </p>
          <Button href={"https://unrigoureconomy.com/"} text={"Learn More"} color={"black"} bgColor={"black"}/>
          <p className="text-sm mt-4">
            © 2025 Unrig Our Economy. All rights reserved.
          </p>
        </div>

        {/* Right Side Image and Social Icons */}
        <div className="flex-1 flex flex-col items-center">
          <img src={brokenEgg} alt="Broken Egg" className="w-96 mb-6" />
          
          <div className="flex items-center space-x-4 text-2xl">
  <a href="https://twitter.com/unrigoureconomy" target="_blank" rel="noopener noreferrer" className='w-5 h-5'>
    <img src={x} className="hover:underline cursor-pointer" alt="Twitter" />
  </a>
  <a href="https://www.facebook.com/unrigoureconomy" target="_blank" rel="noopener noreferrer" className='w-5 h-5'>
    <img src={fb} className="hover:underline cursor-pointer" alt="Facebook" />
  </a>
  <a href="https://www.instagram.com/unrigoureconomy" target="_blank" rel="noopener noreferrer" className='w-5 h-5'>
    <img src={ig} className="hover:underline cursor-pointer" alt="Instagram" />
  </a>
  <a href="https://www.youtube.com/@unrigoureconomy7881" target="_blank" rel="noopener noreferrer" className='w-5 h-5'>
    <img src={yt} className="hover:underline cursor-pointer" alt="YouTube" />
  </a>
  <a href="https://www.tiktok.com/@unrigoureconomy?_t=8jJDaPoYwJj&_r=1" target="_blank" rel="noopener noreferrer" className='w-5 h-5'>
    <img src={tiktok} className="hover:underline cursor-pointer" alt="TikTok" />
  </a>
  <a href="https://bsky.app/profile/unrigoureconomy.bsky.social" target="_blank" rel="noopener noreferrer" className='w-5 h-5'>
    <img src={bsky} className="hover:underline cursor-pointer" alt="Bluesky" />
  </a>
</div>

        </div>
        
      </div>
    </footer>
  )
}

export default Footer
