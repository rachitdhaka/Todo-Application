import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const SignupPage = () => {

    const navigate = useNavigate();

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")



    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate inputs
        if (!name || !email || !password) {
            toast.error("Please fill in all fields");
            return;
        }



        try {
            const data = { name, email, password };
            const response = await axios.post('https://todo-application-8ozv.onrender.com/user/signup', data);

            console.log(response.data);
            toast.success("Signup successful! Please login.");


            setTimeout(() => {
                navigate('/login');
            }, 1500);

        } catch (error) {
            console.log(error);
            const errorMessage = error.response?.data?.message || "Signup failed. Please try again.";
            toast.error(errorMessage);
        }
    }




    return (
        <div className='flex min-h-screen bg-gray-100 justify-center items-center px-4 sm:px-6 py-8'>
            <Toaster position="top-center" />
            <div className="shadow-lg mx-auto w-full max-w-md rounded-2xl bg-white p-4 sm:p-6 md:p-8">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-neutral-800">Welcome to Todo</h2>
            <p className="mt-2 max-w-sm text-xs sm:text-sm text-neutral-600">
                Sign up to continue your journey with us.
            </p>

            <form className="my-6 sm:my-8" onSubmit={handleSubmit} >
                {/* First & Last Name */}


                <div className="mb-3 sm:mb-4 flex flex-col space-y-2">
                    <div className="flex w-full flex-col space-y-2">
                        <label htmlFor="firstname" className="text-xs sm:text-sm font-medium text-neutral-700">
                            Name
                        </label>
                        <input
                            id="firstname"
                            placeholder="Tyler"
                            type="text"
                            className="rounded-md border border-gray-300 bg-white p-2 sm:p-2.5 text-xs sm:text-sm text-neutral-800 focus:border-blue-400 focus:outline-none"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </div>

                {/* Email */}
                <div className="mb-3 sm:mb-4 flex w-full flex-col space-y-2">
                    <label htmlFor="email" className="text-xs sm:text-sm font-medium text-neutral-700">
                        Email Address
                    </label>
                    <input
                        id="email"
                        placeholder="projectmayhem@fc.com"
                        type="email"
                        className="rounded-md border border-gray-300 bg-white p-2 sm:p-2.5 text-xs sm:text-sm text-neutral-800 focus:border-blue-400 focus:outline-none"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        className="rounded-md border border-gray-300 bg-white p-2 sm:p-2.5 text-xs sm:text-sm text-neutral-800 focus:border-blue-400 focus:outline-none"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"

                    className="group relative block h-10 sm:h-11 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-sm sm:text-base text-white shadow-inner hover:opacity-90 transition-opacity"
                >
                    Sign Up &rarr;
                    <BottomGradient />
                </button>
            </form>



            <div className="text-center">
                <p className='text-xs sm:text-sm text-neutral-600'>Already have an Account? <NavLink to="/login" className="text-blue-500 hover:underline font-medium">Log in</NavLink></p>
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

export default SignupPage
