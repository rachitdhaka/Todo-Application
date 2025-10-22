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
        const response = await axios.get("https://todo-application-8ozv.onrender.com/todo/view", {
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
    <div className="bg-white rounded-lg  shadow-md p-2 sm:p-4 md:p-2">

      <h2 className="text-lg sm:text-xl font-regular   mb-3 sm:mb-4"><span className='instrument-serif-regular text-2xl'>Your Tasks</span></h2>


        <ul className=" w-full grid grid-cols-5 gap-4 ">
          {todos.map((todo) => (

            <li
              key={todo._id}
              className="bg-gray-50 rounded-md w-fit shadow-sm p-3 flex justify-between items-center gap-4 sm:gap-6"
            >
              <div className="flex-1  w-fit">
                <h3 className="font-bold w-fit text-sm sm:text-base break-words">{todo.title}</h3>
                <p className="text-xs w-fit sm:text-sm text-gray-500 mt-1">Priority: <span className="capitalize">{todo.priority}</span></p>
              </div>


              <div className='flex flex-col gap-2 w-full sm:w-auto justify-end'>
                <button className='px-2 sm:px-3 py-1 text-xs sm:text-sm bg-green-600 rounded-md text-white cursor-pointer hover:bg-green-800 transition-colors whitespace-nowrap'
                  onClick={() => deleteTodo(todo._id)}>
                  Completed
                </button>
               
              </div>
            </li>

          ))}
        </ul>



    </div>
  )
}

export default ShowTodo
