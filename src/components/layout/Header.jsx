import React from 'react';
import {Link, NavLink} from "react-router-dom"
const Header = () => {
    return (
        <header className="flex items-center justify-between px-12 py-10 text-white header gap-x-5">
            <div className='max-w-[100px]'>
                <Link to="/">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/799px-Netflix_2015_logo.svg.png?20190206123158" alt="" className='w-full h-full'/>
                </Link>
              
            </div>
            <div className='flex items-center gap-x-5'>
                <NavLink to="/" className={({isActive})=> (isActive ? "text-primary" : "")}>Home</NavLink>
                <NavLink to="/Movies"className={({isActive})=> (isActive ? "text-primary" : "")} >Movies</NavLink>
                <NavLink to="/Tv"className={({isActive})=> (isActive ? "text-primary" : "")} >Tv Show</NavLink>
            </div>
           
      </header>
    );
};

export default Header;