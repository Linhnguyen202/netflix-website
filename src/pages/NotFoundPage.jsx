import React from 'react';
import { NavLink } from 'react-router-dom';
const NotFoundPage = () => {
    return (
        <div className='flex items-center justify-center w-full h-screen'>
            <div className='flex flex-col items-center justify-center'>
              <NavLink to="/" className="flex justify-center m-0">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/799px-Netflix_2015_logo.svg.png?20190206123158" alt="" className='w-2/4 h-2/4'/>
                </NavLink>
                <h1 className="mt-5 text-2xl">
                    Oops!Page not found
                </h1>
                <NavLink to="/" className="p-3 mt-4 border border-red-600">
                    back to home
                </NavLink>  
            </div>
            
      
        </div>
    );
};

export default NotFoundPage;