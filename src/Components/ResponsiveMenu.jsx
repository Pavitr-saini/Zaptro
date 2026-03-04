import { useUser, UserButton } from '@clerk/clerk-react'
import React from 'react'
import { FaUserCircle } from 'react-icons/fa'
import {Link,NavLink } from  'react-router-dom'
import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react'
function ResponsiveMenu({openNav ,setOpenNav}) {
    const {user} =useUser()
  return (
      <div className={`${openNav ? "left-0" : "-left-[100%]"} fixed bottom-0 top-0 z-20 flex h-screen w-[75%] flex-col justify-between bg-white px-8 pb-6 pt-16 text-black md:hidden rounded-r-xl shadow-md transition-all`}>
    <div>
         {
          user ? <div>
            <div className='flex items-center justify-start gap-4'>
              {
                user ? <UserButton size={50} /> : <FaUserCircle size={50} />

              }
              <div>
                <h1>Hello, {user?.firstName}</h1>
                <h1 className='text-sm text-slate-500'>Premium User</h1>
              </div>
            </div>
          </div> : <div>
            <SignedOut>
              <SignInButton className="bg-black text-white text-lg px-4 py-2 rounded-md cursor-pointer" />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
         }
              {/* <div className='flex items-center justify-start gap-4'>
            {
            user ? <UserButton size={50} /> : <FaUserCircle size={50} />
  
            }
            <div>
                      <h1>Hello, {user?.firstName}</h1>
                      <h1 className='text-sm text-slate-500'>Premium User</h1>
            </div>
        </div> */}
        <nav className='mt-12'>
                  <ul className='flex flex-col gap-7 text-2xl font-semibold'>
            <NavLink to={'/'} onClick={() => setOpenNav(false)} className={({ isActive }) => `${isActive ? "border-b-3 transition-all border-red-500 w-25" : "text-black"} cursor-pointer`}><li>Home</li></NavLink>
            <NavLink to={"/products"} onClick={() => setOpenNav(false)} className={({ isActive }) => `${isActive ? "border-b-3 transition-all border-red-500 w-25" : "text-black"} cursor-pointer`}><li>Products</li></NavLink>
            <NavLink to={"/about"} onClick={() => setOpenNav(false)} className={({ isActive }) => `${isActive ? "border-b-3 transition-all border-red-500 w-25" : "text-black"} cursor-pointer`}><li>About</li></NavLink>
            <NavLink to={"/contact"} onClick={() => setOpenNav(false)} className={({ isActive }) => `${isActive ? "border-b-3 transition-all border-red-500 w-25" : "text-black"} cursor-pointer`}><li>Contact</li></NavLink>
            <NavLink to={"/wishlist"} onClick={() => setOpenNav(false)} className={({ isActive }) => `${isActive ? "border-b-3 transition-all border-red-500 w-25" : "text-black"} cursor-pointer`}><li>Wishlist</li></NavLink>
            
        </ul>
        </nav>
    </div> 
    </div>
  )
}

export default ResponsiveMenu