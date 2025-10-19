import React, { useEffect, useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import noTodo from "../assets/image/Bgimg.png"
const ShowTodo = ({ refreshTrigger }) => {

  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const fetchTodos = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error("No token found");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/todo/view", {
          headers: { token },
        });
        setTodos(response.data.todoList);
        console.log("Todos fetched successfully:", response.data.todoList);
      } catch (error) {
        console.error("Error fetching todos:", error);
        if (error.response?.status === 403) {
          toast.error("Session expired. Please login again.");
        } else {
          toast.error("Error Fetching Todos");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchTodos();
  }, [refreshTrigger])

  const deleteTodo = async (id) => {
    const token = localStorage.getItem('token');

    try {
      await axios.delete("https://todo-application-8ozv.onrender.com/todo/delete", {
        headers: { token },
        data: { id }
      });
      toast.success("Todo Deleted");
      // Refresh the todo list after deletion
      const response = await axios.get("https://todo-application-8ozv.onrender.com/todo/view", {
        headers: { token },
      });
      setTodos(response.data.todoList);
    } catch (error) {
      console.error("Error deleting todo:", error);
      toast.error("Error Deleting Todo");
    }
  }



  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6">

      <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Your Tasks</h2>

      {loading ? (
        <p className="text-gray-500 text-sm sm:text-base">Loading todos...</p>
      ) : todos.length === 0 ? (
        <div className='flex flex-col justify-center items-center py-4 sm:py-6'>
          <p className="text-sm sm:text-base mb-3">No todos yet. Add one!</p>
          <img src={noTodo} alt="No Todo found" className="w-32 sm:w-40 md:w-52 h-auto" />
        </div>
      ) : (
        <ul className="space-y-2 sm:space-y-3">
          {todos.map((todo) => (
            <li
              key={todo._id}
              className="bg-gray-50 rounded-md shadow-sm p-3 sm:p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-2"
            >
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm sm:text-base break-words">{todo.title}</h3>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">Priority: <span className="capitalize">{todo.priority}</span></p>
              </div>


              <div className='flex gap-2 w-full sm:w-auto justify-end'>
                <button className='px-2 sm:px-3 py-1 text-xs sm:text-sm bg-red-700 rounded-md text-red-200 cursor-pointer hover:bg-red-800 transition-colors whitespace-nowrap'
                  onClick={() => deleteTodo(todo._id)}>
                  Delete
                </button>
                <span
                  className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-md whitespace-nowrap ${todo.done ? "bg-green-200 text-green-800" : "bg-yellow-200 text-yellow-800"
                    }`}
                >
                  {todo.done ? "Done" : "Pending"}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}

    </div>
  )
}

export default ShowTodo
