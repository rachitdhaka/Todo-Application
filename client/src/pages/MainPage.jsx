import React, { useState } from 'react'
import { TodoHeader } from '../components/TodoHeader';
import TodoCreate from '../components/TodoCreate';
import ShowTodo from '../components/ShowTodo';
import { Toaster } from 'react-hot-toast';
import Navbar from '../components/Navbar';

const MainPage = () => {
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleTodoCreated = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    return (
        <div className='bg-gray-100 min-h-screen'>
            <Navbar/>
            <Toaster position="top-center" />
            <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8 max-w-7xl'>
                <TodoHeader />
            </div>

            <div className='w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-start justify-center gap-4 sm:gap-6 mb-8 px-4 sm:px-6 lg:px-8'>
                <div className='w-full lg:w-[50%]'>
                    <TodoCreate onTodoCreated={handleTodoCreated} />
                </div>
                <div className='w-full lg:w-[50%]'>
                    <ShowTodo refreshTrigger={refreshTrigger} />
                </div>
            </div>
        </div>
    )
}
const BottomGradient = () => (
    <>
        <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
        <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover:opacity-100" />
    </>
);

export default MainPage
