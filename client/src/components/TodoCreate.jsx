import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast';
const TodoCreate = ({ onTodoCreated }) => {

    const PriorityButton = ["easy", "medium", "hard"];

    const [title, setTitle] = useState('')
    const [priority, setPriority] = useState('');
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate inputs
        if (!title.trim()) {
            setError('Please enter a task title');
            return;
        }

        if (!priority) {
            setError('Please select a priority level');
            return;
        }

        // Create todo data
        try {
            const todoData = {
                title: title.trim(),
                priority: priority
            };

            // Get token from localStorage
            const token = localStorage.getItem('token');

            if (!token) {
                setError('Please login to create tasks');
                toast.error('Please login to create tasks');
                return;
            }

            const response = await axios.post("http://localhost:3000/todo/create", todoData, {
                headers: {
                    'token': token
                }
            });

            console.log(response);
            toast.success('Task created successfully!');

            // Reset form
            setTitle('');
            setPriority('');
            setError('');

            // Trigger refresh in parent component
            if (onTodoCreated) {
                onTodoCreated();
            }
        } catch (e) {
            console.error('Error creating todo:', e);
            const errorMessage = e.response?.data?.message || 'Failed to create task. Please try again.';
            setError(errorMessage);
            toast.error(errorMessage);
        }
    }
    return (
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Add New Task</h2>

            {error && (
                <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-xs sm:text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-3 sm:mb-4">
                    <label
                        htmlFor="title"
                        className="block text-gray-700 font-medium mb-2 text-sm sm:text-base"
                    >
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter task title"
                    />
                </div>

                <div className="mb-3 sm:mb-4">
                    <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                        Priority
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {PriorityButton.map((level) => (
                            <button
                                key={level}
                                type="button"
                                onClick={() => setPriority(level)}
                                className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-md capitalize transition-colors ${priority === level
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    }`}
                            >
                                {level}
                            </button>
                        ))}
                    </div>
                </div>



                <button
                    type="submit"
                    className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 sm:px-6 mt-4 sm:mt-6 rounded-md transition-colors text-sm sm:text-base"
                >
                    Add Task
                </button>
            </form>
        </div>
    )
}

export default TodoCreate
