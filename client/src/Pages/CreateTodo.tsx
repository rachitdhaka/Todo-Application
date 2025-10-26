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
type CreateTodoProps = {
  onTodoCreated?: () => void;
};

const CreateTodo: React.FC<CreateTodoProps> = ({ onTodoCreated }) => {
  // All usestate hooks
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [priority, setPriority] = React.useState("");

  // Form submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !priority) {
      return;
    }

    console.log(title, description, priority);

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
            <Button variant="outline">Create Todo</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Todo</DialogTitle>
              <DialogDescription>
                Fill in the details for your new todo item.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label>Title</Label>
                <Input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <Label>Description</Label>
                <Input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div>
                <Select value={priority} onValueChange={setPriority}>
                  <Label className="mb-4">Priority</Label>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" onClick={handleSubmit}>
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>) : <Vacant />}
    </div>
  );
};

export default CreateTodo;
