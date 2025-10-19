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
        <div className='bg-gray-100 h-screen'>
            <Navbar/>
            <Toaster position="top-center" />
            <div className='container mx-auto px-4 py-8 max-w-6xl '>
                <TodoHeader />
            </div>

            <div className='w-6xl mx-auto flex items-start justify-center gap-4 mb-8 p-4 rounded-lg'>
                <div className='w-[50%]'>
                    <TodoCreate onTodoCreated={handleTodoCreated} />
                </div>
                <div className='w-[50%]'>
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
