import React, { useEffect } from 'react'

function Subscribe() {
  useEffect(() => {
    // Only load the script if it's not already loaded
    if (!document.querySelector('script[src="https://static.everyaction.com/ea-actiontag/at.js"]')) {
      const script = document.createElement('script')
      script.src = 'https://static.everyaction.com/ea-actiontag/at.js'
      script.crossOrigin = 'anonymous'
      script.async = true
      document.body.appendChild(script)
    }
  }, [])
  

  return (
    <div className="bg-[#F0F3FF] text-black px-6 py-12">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-10">
        
        {/* Left Side Content */}
        <div className="flex-1">
          <h2 className="text-4xl font-bold leading-tight mb-4">
            Sign up for the Unrig Our Economy email list.
          </h2>
        </div>

        {/* Right Side Form */}
        <div className="flex-1 w-full max-w-md">
          <div
            className="ngp-form"
            data-form-url="https://secure.everyaction.com/v1/Forms/VclP0zEJRkOLk5uvhfgaAw2"
            data-fastaction-endpoint="https://fastaction.ngpvan.com"
            data-inline-errors="true"
            data-fastaction-nologin="true"
            data-databag-endpoint="https://profile.ngpvan.com"
            data-databag="everybody"
            data-mobile-autofocus="false"
          ></div>
        </div>
        
      </div>
    </div>
  )
}

export default Subscribe
