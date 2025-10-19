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
        <div className=" bg-white rounded-lg shadow-md p-6 ">
            <h2 className="text-xl font-semibold mb-4">Add New Task</h2>

            {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label
                        htmlFor="title"
                        className="block text-gray-700 font-medium mb-2"
                    >
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter task title"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                        Priority
                    </label>
                    <div>
                        {PriorityButton.map((level) => (
                            <button
                                key={level}
                                type="button"
                                onClick={() => setPriority(level)}
                                className={`mr-2 px-4 py-2 rounded-md capitalize ${priority === level
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-200 text-gray-700"
                                    }`}
                            >
                                {level}
                            </button>
                        ))}
                    </div>
                </div>



                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4   mt-6 rounded-md transition-colors"
                >
                    Add Task
                </button>
            </form>
        </div>
    )
}

export default TodoCreate
