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
      await axios.delete("http://localhost:3000/todo/delete", {
        headers: { token },
        data: { id }
      });
      toast.success("Todo Deleted");
      // Refresh the todo list after deletion
      const response = await axios.get("http://localhost:3000/todo/view", {
        headers: { token },
      });
      setTodos(response.data.todoList);
    } catch (error) {
      console.error("Error deleting todo:", error);
      toast.error("Error Deleting Todo");
    }
  }



  return (
    <div className=" bg-white rounded-lg shadow-md p-6 ">

      <h2 className="text-xl font-semibold mb-4">Your Task</h2>

      {loading ? (
        <p className="text-gray-500">Loading todos...</p>
      ) : todos.length === 0 ? (
        <div className='flex flex-col justify-center items-center'>
          <p>No todos yet. Add one!</p>
          <img src={noTodo} alt="No Todo found" height={100} width={210} />
        </div>
      ) : (
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo._id}
              className="bg-white rounded-md shadow-sm p-3 flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold">{todo.title}</h3>
                <p className="text-sm text-gray-500">Priority: {todo.priority}</p>
              </div>


              <div className='flex gap-2'>
                <button className='px-3 py-1 bg-red-700 rounded-md text-red-200 cursor-pointer'
                  onClick={() => deleteTodo(todo._id)}>
                  Delete
                </button>
                <span
                  className={`px-3 py-1 text-sm rounded-md ${todo.done ? "bg-green-200 text-green-800" : "bg-yellow-200 text-yellow-800"
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
