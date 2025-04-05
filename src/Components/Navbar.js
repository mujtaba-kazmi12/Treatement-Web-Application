import React from 'react'

const Navbar = () => {
   
  return (
    <nav className="flex items-center justify-between p-2 bg-white shadow-strong-bottom relative z-20"
    style={{
        boxShadow: 'rgba(0, 0, 0, 0.2) 0px 6px 20px'
      }}
    >
        {/* Left empty div for spacing */}
        <div className="w-24"></div>
        
        {/* Center logo */}
        <div className='flex flex-col items-center'>
          <div className="text-lg font-bold">Strella Medical</div>
          <div className="text-sm flex items-center justify-center">AESTHETICS</div>
        </div>
        
        {/* Exit link */}
        <div className="w-24 flex justify-end">
          <a 
            href="https://www.strellapa.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center px-3 py-1 text-sm font-medium text-white bg-strella rounded-full hover:bg-opacity-90 transition-colors duration-300"
          >
            <span className="mr-1">Exit</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
    </nav>
  )
}

export default Navbar
