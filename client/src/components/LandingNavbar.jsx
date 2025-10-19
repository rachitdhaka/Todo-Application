import React from 'react'
import { NavLink } from "react-router-dom";
const LandingNavbar = () => {
    return (
        <div className=' relative min-w-3xl mt-5 p-2 bg-gray-200  flex justify-end rounded-full shadow-input'>
            <div className='flex items-center gap-4 mr-4 manrope-regular'>
                <NavLink to="/login" className='cursor-pointer hover:text-gray-700'>Login</NavLink>
                <NavLink to="/signup" className='cursor-pointer hover:text-gray-700'>Signup</NavLink>
            </div>

        </div>
    )
}

export default LandingNavbar
