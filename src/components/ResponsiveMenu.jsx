import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useUser, SignInButton, UserButton } from '@clerk/clerk-react'

const ResponsiveMenu = ({ openNav, setOpenNav }) => {
  const { user } = useUser()

  return (
    <div
      className={`${
        openNav ? 'left-0' : '-left-[100%]'
      } fixed bottom-0 top-0 z-20 flex h-screen w-[75%] flex-col justify-between 
      bg-white px-8 pb-6 pt-16 text-black md:hidden rounded-r-xl shadow-md transition-all`}
    >
      {/* Close Icon */}
      <div
        className="absolute top-5 right-5 cursor-pointer"
        onClick={() => setOpenNav(false)}
      >
        <AiOutlineClose size={30} />
      </div>

      {/* User Section */}
      <div className="mt-10">
        <div className="flex items-center justify-start gap-3">
          {user ? (
            <div className="w-12 h-12">
              <UserButton />
            </div>
          ) : (
            <SignInButton className="bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer" />
          )}

          <div>
            <h1>Hello, {user?.firstName || 'Guest'}</h1>
            {user && <h1 className="text-sm text-slate-500">Premium User</h1>}
          </div>
        </div>

        {/* Nav Links */}
        <nav className="mt-12">
          <ul className="flex flex-col gap-7 text-2xl font-semibold">
            <Link to="/" onClick={() => setOpenNav(false)} className="cursor-pointer">
              <li>Home</li>
            </Link>
            <Link to="/products" onClick={() => setOpenNav(false)} className="cursor-pointer">
              <li>Products</li>
            </Link>
            <Link to="/about" onClick={() => setOpenNav(false)} className="cursor-pointer">
              <li>About</li>
            </Link>
            <Link to="/contact" onClick={() => setOpenNav(false)} className="cursor-pointer">
              <li>Contact</li>
            </Link>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default ResponsiveMenu
