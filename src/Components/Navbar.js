import React from 'react'

const Navbar = () => {
   
  return (
    <nav   className="flex items-center justify-center p-2 bg-white shadow-strong-bottom relative z-10"
    style={{
        boxShadow: 'rgba(0, 0, 0, 0.2) 0px 6px 20px'
      }}
    >
        <div className='flex flex-col'>
        <div className="text-lg font-bold">About Face</div>
        <div className="text-sm flex items-center justify-center">AESTHETICS</div>
        </div>
     
      
    </nav>
  )
}

export default Navbar
