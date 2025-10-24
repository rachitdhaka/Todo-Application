import React from 'react'
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Progress from '../components/Progress';

const LoginPage = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();



    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate inputs
        if (!email || !password) {
            toast.error("Please fill in all fields");
            return;
        }

        setIsLoading(true);

        try {
            const data = { email, password };

            const response = await axios.post('https://todo-application-8ozv.onrender.com/user/login', data);

            console.log(response.data);

            // Store token in localStorage
            if (response.data.token && response.data.name) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('name', response.data.name);
            }

            toast.success("Login successful!");

            // Navigate to home page after successful login
            setTimeout(() => {
                navigate('/view');
            }, 1500);

        } catch (error) {
            console.log(error);
            const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }

    }

    return (
        <div className='flex min-h-screen bg-gray-100 justify-center items-center px-4 sm:px-6 py-8 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]'>
            <Toaster position="top-center"  />
            <div className="shadow-lg mx-auto w-full max-w-md rounded-2xl bg-white p-4 sm:p-6 md:p-8">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-neutral-800">Welcome to Todo</h2>
                <p className="mt-2 max-w-sm text-xs sm:text-sm text-neutral-600">
                    Login to continue your journey with us.
                </p>

                <form className="my-6 sm:my-8" onSubmit={handleSubmit} >
                    {/* First & Last Name */}
                    {/* <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                    <div className="flex w-full flex-col space-y-2">
                        <label htmlFor="firstname" className="text-sm font-medium text-neutral-700">
                            First name
                        </label>
                        <input
                            id="firstname"
                            placeholder="Tyler"
                            type="text"
                            className="rounded-md border border-gray-300 bg-white p-2 text-sm text-neutral-800 focus:border-blue-400 focus:outline-none"
                        />
                    </div>

                    <div className="flex w-full flex-col space-y-2">
                        <label htmlFor="lastname" className="text-sm font-medium text-neutral-700">
                            Last name
                        </label>
                        <input
                            id="lastname"
                            placeholder="Durden"
                            type="text"
                            className="rounded-md border border-gray-300 bg-white p-2 text-sm text-neutral-800 focus:border-blue-400 focus:outline-none"
                        />
                    </div>
                </div> */}

                    {/* Email */}
                    <div className="mb-3 sm:mb-4 flex w-full flex-col space-y-2">
                        <label htmlFor="email" className="text-xs sm:text-sm font-medium text-neutral-700">
                            Email Address
                        </label>
                        <input
                            id="email"
                            placeholder="projectmayhem@fc.com"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="rounded-md border border-gray-300 bg-white p-2 sm:p-2.5 text-xs sm:text-sm text-neutral-800 focus:border-blue-400 focus:outline-none"
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-6 sm:mb-8 flex w-full flex-col space-y-2">
                        <label htmlFor="password" className="text-xs sm:text-sm font-medium text-neutral-700">
                            Password
                        </label>
                        <input
                            id="password"
                            placeholder="••••••••"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="rounded-md border border-gray-300 bg-white p-2 sm:p-2.5 text-xs sm:text-sm text-neutral-800 focus:border-blue-400 focus:outline-none"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="group relative block h-10 sm:h-11 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-sm sm:text-base text-white shadow-inner hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Logging in...' : 'Login →'}
                        <BottomGradient />
                    </button>

                    {/* Loading Progress Bar */}
                    {isLoading && (
                        <div className="mt-4">
                            <Progress value={100} className="animate-pulse" />
                        </div>
                    )}
                </form>



                <div className="text-center">
                    <p className='text-xs sm:text-sm text-neutral-600'>Don't have an account? <NavLink to="/signup" className="text-blue-500 hover:underline font-medium">Sign up</NavLink></p>
                </div>
            </div>
        </div>
    );
};

const BottomGradient = () => (
    <>
        <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
        <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover:opacity-100" />
    </>
);



export default LoginPage
