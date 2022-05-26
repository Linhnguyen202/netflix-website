import React, { useState } from 'react';
import {Link, NavLink} from "react-router-dom"
const Header = () => {
    const [navmobile,setNavmobile] = useState(false)
    const handleShowNav = ()=>{
        setNavmobile(!navmobile)
    }
    return (
        <header className="flex items-center justify-between px-12 py-10 text-white header gap-x-5">
            <div className='max-w-[100px]'>
                <Link to="/">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/799px-Netflix_2015_logo.svg.png?20190206123158" alt="" className='w-full h-full'/>
                </Link>
              
            </div>
            <div className='block cursor-pointer md:hidden' onClick={handleShowNav}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            </div>
            <div className={`fixed inset-0 bg-black bg-opacity-50 ${navmobile ? "block" : "hidden"} md:hidden`}></div>
            <div className={`fixed top-0 bottom-0 right-0 z-10 w-[250px] md:w-auto ${navmobile ? "block" : "hidden"} md:block  p-5 bg-black md:relative`}>
                <div className='absolute block cursor-pointer right-3 top-3 md:hidden' onClick={handleShowNav}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div className='flex flex-col gap-3 ml-4 md:items-center mt-7 md:flex-row md:gap-5 md:flex md:m-0'>
                    <NavLink to="/" className={({isActive})=> (isActive ? "text-primary block" : "block")} onClick={handleShowNav}>Home</NavLink>
                    <NavLink to="/Movies"className={({isActive})=> (isActive ? "text-primary block" : "block")} onClick={handleShowNav}>Movies</NavLink>
                    <NavLink to="/Tv"className={({isActive})=> (isActive ? "text-primary block" : "block")} onClick={handleShowNav}>Tv Show</NavLink>
                </div>
               
            </div>
           
      </header>
    );
};

export default Header;