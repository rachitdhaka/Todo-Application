import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

    const [name, setName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {

        const storedName = localStorage.getItem('name');
        if (storedName) {
            setName(storedName);
        }
    }, []);

    const logout = () => {

        localStorage.removeItem('token');
        localStorage.removeItem('name');


        navigate('/login');
    }

    const login = () => {
        navigate('/login');
    }

    const isLoggedIn = localStorage.getItem('token');

    return (
        <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between sm:justify-end items-center gap-2 sm:gap-4'>

            {isLoggedIn ? (
                <>
                    <p className='px-2 sm:px-3 py-1 sm:py-2 rounded-md font-medium text-gray-700 text-xs sm:text-sm md:text-base truncate max-w-[120px] sm:max-w-none'>
                        Welcome, {name}
                    </p>
                    <button className='px-3 sm:px-2 sm:py-1 rounded-md bg-red-600 text-white cursor-pointer hover:bg-red-800 transition-colors text-xs sm:text-sm md:text-base whitespace-nowrap'
                    onClick={logout}>
                        Logout
                    </button>
                </>
            ) : (
                <button className='px-3 sm:px-4 py-1 sm:py-2 rounded-md bg-green-600 text-white cursor-pointer hover:bg-green-700 transition-colors text-xs sm:text-sm md:text-base whitespace-nowrap'
                onClick={login}>
                    Log In
                </button>
            )}
        </div>
    )
}

export default Navbar

