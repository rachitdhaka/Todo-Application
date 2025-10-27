import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Vacant from "./Vacant";
import { useNavigate } from "react-router-dom";
type CreateTodoProps = {
  onTodoCreated?: () => void;
};

const CreateTodo: React.FC<CreateTodoProps> = ({ onTodoCreated }) => {
  // All usestate hooks
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [priority, setPriority] = React.useState("");
    const navigate = useNavigate();

  // Form submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !priority) {
      return;
    }

    // console.log(title, description, priority);

    try {
      const data = { title, description, priority };
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "https://todo-application-nze4.onrender.com/todo/create",
        data,
        {
          headers: { token },
        }
      );
      console.log("Todo created successfully:", response.data);
      if (onTodoCreated) {
        onTodoCreated();
      }
       navigate("/dashboard");

    } catch (error) {
      console.error("Error creating todo:", error);
    }

    setTitle("");
    setDescription("");
    setPriority("");
  };

  const isLoggedIn = localStorage.getItem("token");
  return (
    <div>
      {isLoggedIn ? (
        <Dialog>
        <form onSubmit={handleSubmit}>
          <DialogTrigger asChild>
            <Button variant="outline" className="text-sm sm:text-base px-3 sm:px-4">Create Todo</Button>
          </DialogTrigger>
          <DialogContent className="w-[calc(100vw-2rem)] max-w-[425px] mx-auto">
            <DialogHeader>
              <DialogTitle className="text-lg sm:text-xl">Create Todo</DialogTitle>
              <DialogDescription className="text-sm sm:text-base">
                Fill in the details for your new todo item.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-3 sm:gap-4">
              <div className="grid gap-2 sm:gap-3">
                <Label className="text-sm sm:text-base">Title</Label>
                <Input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-sm sm:text-base"
                />
              </div>
              <div className="grid gap-2 sm:gap-3">
                <Label className="text-sm sm:text-base">Description</Label>
                <Input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="text-sm sm:text-base"
                />
              </div>
              <div>
                <Select value={priority} onValueChange={setPriority}>
                  <Label className="mb-2 sm:mb-4 text-sm sm:text-base">Priority</Label>
                  <SelectTrigger className="w-full sm:w-[180px] text-sm sm:text-base">
                    <SelectValue placeholder="Select a priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="low" className="text-sm sm:text-base">Low</SelectItem>
                      <SelectItem value="medium" className="text-sm sm:text-base">Medium</SelectItem>
                      <SelectItem value="high" className="text-sm sm:text-base">High</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
              <DialogClose asChild>
                <Button variant="outline" className="w-full sm:w-auto text-sm sm:text-base">Cancel</Button>
              </DialogClose>
              <Button type="submit" onClick={handleSubmit} className="w-full sm:w-auto text-sm sm:text-base">
                Create Todo
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>) : <Vacant />}
    </div>
  );
};

export default CreateTodo;
