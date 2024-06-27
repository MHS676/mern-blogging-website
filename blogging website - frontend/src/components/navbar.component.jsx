import React, { useState } from 'react';
import logo from "../imgs/logo.png";
import { Link } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";
import '../index.css';
import { LuFileEdit } from 'react-icons/lu';

const Navbar = () => {
  const [searchBoxVisibility, setSearchBoxVisibility] = useState(false);

  return (
    <nav className='navbar'>
      <Link to='/' className="flex-none w-10">
        <img className='w-full' src={logo} alt="Logo" />
      </Link>

      <div className={`absolute bg-white w-full left-0 top-full mt-0.5 border-b border-grey py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto ${searchBoxVisibility ? 'block' : 'hidden'}`}>
        <input 
          type="text" 
          placeholder='Search'
          className='w-full md:w-auto bg-grey p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12'
        />
        <IoSearch className='absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl text-dark-grey' />
      </div>

      <div className='flex items-center gap-3 md:gap-6 ml-auto'>
        <button 
          className='md:hidden bg-grey w-12 h-12 rounded-full flex items-center justify-center'
          onClick={() => setSearchBoxVisibility(currentVal => !currentVal)}
        >
          <IoSearch className='text-xl' />
        </button>

        <Link to="/editor" className='hidden md:flex gap-2 link'>
        <LuFileEdit  className='text-2xl'/>
        <p>Write</p>
        </Link>

        <Link className='btn-dark py-2' to='/signin'>
            Sign In
        </Link>
        <Link className='btn-light py-2 hidden md:block' to='/signup'>
            Sign Up
        </Link>

      </div>
    </nav>
  );
}

export default Navbar;
