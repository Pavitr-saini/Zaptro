// import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
// import {  MapPin } from 'lucide-react'
// import { CgClose } from 'react-icons/cg'
// import { FaCaretDown } from 'react-icons/fa'
// import { IoCartOutline } from 'react-icons/io5'
// import React from 'react'
// import { Link,NavLink } from 'react-router-dom'
// import { useState } from 'react'
// import { useCartContext } from '../Context/CartContext'
// import { HiMenuAlt1, HiMenuAlt3 } from 'react-icons/hi'
// import ResponsiveMenu from './ResponsiveMenu'


// function Navbar() {
//   const [openDropdown, setOpenDropdown] = useState(false);
//   const [openNav, setOpenNav] = useState(false)
//   const{cartItem} =useCartContext()
//     const location = false;
//     const toggleDrop = () => {
//       setOpenDropdown(!openDropdown)
//     }
//   return (

//     <div className="bg-white py-3 shadow-2xl px-4 md:px-0">
//       <div className='max-w-6xl flex  items-center'>
//     <div className='flex items-center  gap-7'>
    
//     <Link to={'/'}>
//       <h1 className='font-bold text-3xl'><span className='text-red-700 font-bold text-4xl'>Z</span>eptro</h1>
//     </Link>
//           <div className='md:flex gap-1 cursor-pointer text-gray-700 items-center hidden'>
//             <MapPin className='text-red-500 '/>
//        <span className='font-semibold'>{location?<div>

//        </div>:"Add Address"}</span>
//       <FaCaretDown onClick={toggleDrop} className='mt-1'/>
//     </div>
//     {
//             openDropdown ? <div className='w-62.5 h-max shadow-2xl z-50 bg-white fixed top-16 left-60 border-2 p-5 border-gray-100 rounded-md'>
//               <h1 className='font-semibold mb-4 text-xl flex justify-between'>Change Location <span onClick={toggleDrop} className='cursor-pointer'><CgClose /></span></h1>
//               <button className='bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer hover:bg-red-400'>Detect my location</button>
//       </div>:null
//     }
    
//     {/* menu section */}
//           <nav className='flex gap-7 justify-end items-center'>
//             <ul className='md:flex gap-10  items-center text-xl font-semibold hidden'>
//       <NavLink to={"/"} className={({isActive})=>`${isActive ? "border-b-4 transition-all border-red-500" :"text-black" } cursor-pointer`}><li>Home</li></NavLink>
//               <NavLink to={"/products"} className={({ isActive }) => `${isActive ? "border-b-4 transition-all border-red-500" : "text-black"} cursor-pointer`}><li>Products</li></NavLink>
//               <NavLink to={"/about"} className={({ isActive }) => `${isActive ? "border-b-4 transition-all border-red-500" : "text-black"} cursor-pointer`}><li>About</li></NavLink>
//               <NavLink to={"/contact"} className={({ isActive }) => `${isActive ? "border-b-4 transition-all border-red-500" : "text-black"} cursor-pointer`}><li>Contact</li></NavLink>

//       </ul>
//       <Link to={"/cart"} className='relative'> 
//               <IoCartOutline className='h-7 w-7' />
//               <span className='bg-red-500 px-2 rounded-full absolute -top-3 -right-3 text-white'>{cartItem.length}</span>
//       </Link>
    
//       <div className='hidden md:block'>
//               <SignedOut>
//                 <SignInButton className="bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer " />
//               </SignedOut>
//               <SignedIn>
//                 <UserButton />
//               </SignedIn>
//       </div>
//       {
//               openNav ? <HiMenuAlt3 onClick={() => setOpenNav(false)} className='h-7 w-7 md:hidden' /> : <HiMenuAlt1
//                 onClick={() => setOpenNav(true)}
//                 className='h-7 w-7 md:hidden' />
//       }
//     </nav>
//     </div>
//         <ResponsiveMenu openNav={openNav} setOpenNav={setOpenNav} />
//     </div>
//     </div>
//   )

// }

// export default Navbar 

import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import { MapPin } from 'lucide-react'
import React, { useState } from 'react'
import { CgClose } from 'react-icons/cg'
import { FaCaretDown } from 'react-icons/fa'
import { IoCartOutline } from 'react-icons/io5'
import { Link, NavLink } from 'react-router-dom'
import { useCartContext } from '../Context/CartContext'
import { HiMenuAlt1, HiMenuAlt3 } from 'react-icons/hi'
import ResponsiveMenu from './ResponsiveMenu'

const Navbar = () => {

  const { cartItem } = useCartContext()
  const [openNav, setOpenNav] = useState(false)

  // const toggleDropdown = () => {
  //   setOpenDropdown(!openDropdown)
  // }
  return (
    <div className='bg-white py-3 shadow-2xl px-4 md:px-0'>
      <div className='max-w-6xl mx-auto flex justify-between items-center'>
        {/* logo section */}
        <div className='flex gap-7 items-center'>
          <Link to={'/'}><h1 className='font-bold text-3xl'><span className='text-red-500 font-serif'>Z</span>aptro</h1></Link>
          {/* <div className='md:flex gap-1 cursor-pointer text-gray-700 items-center hidden'>
            <MapPin className='text-red-500' />
            <span className='font-semibold '>{location ? <div className='-space-y-2'>
              <p>{location.county}</p>
              <p>{location.state}</p>
            </div> : "Add Address"}</span>
            <FaCaretDown onClick={toggleDropdown} />
          </div>
          {
            openDropdown ? <div className='w-[250px] h-max shadow-2xl z-50 bg-white fixed top-16 left-60 border-2 p-5 border-gray-100 rounded-md'>
              <h1 className='font-semibold mb-4 text-xl flex justify-between'>Change Location <span onClick={toggleDropdown}><CgClose /></span></h1>
              <button onClick={getLocation} className='bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer hover:bg-red-400'>Detect my location</button>
            </div> : null
          } */}
        </div>
        {/* menu section */}
        <nav className='flex gap-7 items-center'>
          <ul className='md:flex gap-7 items-center text-xl font-semibold hidden'>
            <NavLink to={'/'} className={({ isActive }) => `${isActive ? "border-b-3 transition-all border-red-500" : "text-black"} cursor-pointer`}><li>Home</li></NavLink>
            <NavLink to={"/products"} className={({ isActive }) => `${isActive ? "border-b-3 transition-all border-red-500" : "text-black"} cursor-pointer`}><li>Products</li></NavLink>
            <NavLink to={"/about"} className={({ isActive }) => `${isActive ? "border-b-3 transition-all border-red-500" : "text-black"} cursor-pointer`}><li>About</li></NavLink>
            <NavLink to={"/contact"} className={({ isActive }) => `${isActive ? "border-b-3 transition-all border-red-500" : "text-black"} cursor-pointer`}><li>Contact</li></NavLink>
          </ul>
          <Link to={'/cart'} className='relative'>
            <IoCartOutline className='h-7 w-7' />
            <span className='bg-red-500 px-2 rounded-full absolute -top-3 -right-3 text-white'>{cartItem.length}</span>
          </Link>
          <div className='hidden md:block'>
            <SignedOut>
              <SignInButton className="bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer" />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
          {
            openNav ? <HiMenuAlt3 onClick={() => setOpenNav(false)} className='h-7 w-7 md:hidden' /> : <HiMenuAlt1
              onClick={() => setOpenNav(true)}
              className='h-7 w-7 md:hidden' />
          }
        </nav>
      </div>
      <ResponsiveMenu openNav={openNav} setOpenNav={setOpenNav} />
    </div>
  )
}

export default Navbar