import React from 'react'
import { NavLink } from "react-router-dom";
const LandingNavbar = () => {
    return (
        <div className='relative w-full mt-3 sm:mt-5 p-2 sm:p-3 bg-gray-200 flex justify-between sm:justify-end rounded-full shadow-input'>
            <div className='flex items-center gap-3 sm:gap-4 mr-2 sm:mr-4 geist text-sm sm:text-base'>
                <NavLink to="/login" className='cursor-pointer hover:text-gray-700 px-2 sm:px-3 py-1 rounded-full transition-colors hover:bg-gray-300'>Login</NavLink>
                <NavLink to="/signup" className='cursor-pointer hover:text-gray-700 px-2 sm:px-3 py-1 rounded-full transition-colors hover:bg-gray-300'>Signup</NavLink>
            </div>

        </div>
    )
}

export default LandingNavbar
