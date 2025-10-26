import { useEffect } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";
const Navbar = () => {
  const [name, setName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    const token = localStorage.getItem("token");

    if (storedName) {
      setName(storedName);
    }

    setIsLoggedIn(!!token);
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    setName("");
    setIsLoggedIn(false);
  };

  const login = () => {
    navigate("/login");
  };

  const signup = () => {
    navigate("/signup");
  };

  return (
    <div className="mx-auto w-6xl p-2">
      {isLoggedIn ? (
        <div className="flex  gap-3 justify-end items-center">
          <span className="mr-4">Welcome, {name}!</span>
          <ModeToggle />
          <Button onClick={logoutHandler} className="cursor-pointer">
            Logout
          </Button>
        </div>
      ) : (
        <div className="flex  gap-3 justify-end">
          <ModeToggle />
          <Button onClick={login} className="cursor-pointer">
            Login
          </Button>
          <Button onClick={signup} variant="ghost" className="cursor-pointer">
            Signup
          </Button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
