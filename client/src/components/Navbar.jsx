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
        <div className='w-6xl mx-auto py-3 flex justify-end gap-4'>

            {isLoggedIn ? (
                <>
                    <p className='px-2 py-1 rounded-md font-medium text-gray-700'>
                        Welcome, {name}
                    </p>
                    <button className='px-2 py-1 rounded-md bg-red-700 text-white cursor-pointer hover:bg-red-800 transition-colors'
                    onClick={logout}>
                        Logout
                    </button>
                </>
            ) : (
                <button className='px-2 py-1 rounded-md bg-green-600 text-white cursor-pointer hover:bg-green-700 transition-colors'
                onClick={login}>
                    Log In
                </button>
            )}
        </div>
    )
}

export default Navbar

