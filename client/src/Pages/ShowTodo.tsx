import React, { useState, useEffect } from "react";
import axios from "axios";
import { Checkbox } from "@/components/ui/checkbox";
import { IconTrash } from "@tabler/icons-react";
import Vacant from "./Vacant";
// 🟢 1️⃣ Define the Todo type
type Todo = {
  _id: string;
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
  done: boolean;
};

const ShowTodo: React.FC<{ refreshTrigger: number }> = ({ refreshTrigger }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [_loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const fetchTodos = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found");
        setLoading(false);
        setIsLoggedIn(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get("https://todo-application-nze4.onrender.com/todo/view", {
          headers: { token },
        });
        setTodos(response.data.todoList);
        console.log("Todos fetched successfully:", response.data.todoList);
      } catch (error) {
        console.error("Error fetching todos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, [refreshTrigger]);

  const toggleTodoComplete = async (id: string) => {
    const token = localStorage.getItem("token");
    const todo = todos.find((t) => t._id === id);

    if (!todo || !token) return;

    try {
      // Update the todo in the database
      await axios.put(
        "https://todo-application-nze4.onrender.com/todo/update",
        {
          id: id,
          title: todo.title,
          description: todo.description,
          priority: todo.priority,
          done: !todo.done,
        },
        {
          headers: { token },
        }
      );

      // Update the local state
      setTodos((prev) =>
        prev.map((t) => (t._id === id ? { ...t, done: !t.done } : t))
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodo = async (id: string) => {
    const todoId = id;
    try {
      const token = localStorage.getItem("token");
      await axios.delete("https://todo-application-nze4.onrender.com/todo/delete", {
        headers: { token },
        data: { id: todoId },
      });
      const response = await axios.get("https://todo-application-nze4.onrender.com/todo/view", {
        headers: { token },
      });
      setTodos(response.data.todoList);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        todos.length === 0 ? (
          <Vacant />
        ) : (
          <div className="p-2 sm:p-4">
            <h2 className="text-lg sm:text-xl font-regular mb-3 sm:mb-4">
              <span className="instrument-serif-regular text-xl sm:text-2xl">
                Your Tasks
              </span>
            </h2>

            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {todos.map((todo) => (
                <li
                  key={todo._id}
                  className="bg-gray-50 rounded-md p-3 sm:p-4 flex justify-between items-start gap-3 sm:gap-4 shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]"
                >
                  <div className="flex-1 min-w-0">
                    <h3
                      className={`font-bold text-sm sm:text-base break-words ${
                        todo.done ? "line-through text-gray-500" : ""
                      }`}
                    >
                      {todo.title}
                    </h3>
                    <h3
                      className={`font-regular text-xs sm:text-sm break-words ${
                        todo.done ? "line-through text-gray-500" : ""
                      }`}
                    >
                      {todo.description}
                    </h3>

                    <p
                      className={`text-xs w-fit sm:text-sm text-gray-500 mt-1 ${
                        todo.done ? "line-through" : ""
                      }`}
                    >
                      <span>Priority: </span>
                      <span className="capitalize">{todo.priority}</span>
                    </p>
                  </div>

                  <div className="flex flex-col justify-between h-full items-center gap-3 sm:gap-4 pt-1 cursor-pointer">
                    <Checkbox
                      className="cursor-pointer h-4 w-4 sm:h-5 sm:w-5"
                      id={`todo-${todo._id}`}
                      checked={todo.done}
                      onCheckedChange={() => toggleTodoComplete(todo._id)}
                    />

                    <div onClick={() => deleteTodo(todo._id)} className="hover:text-red-500 transition-colors">
                      <IconTrash stroke={1.5} size={18} className="sm:w-5 sm:h-5" />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )
      ) : null}
    </div>
  );
};

export default ShowTodo;


