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
    <div className="mx-auto max-w-7xl px-2 sm:px-4 py-2">
      {isLoggedIn ? (
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-end items-center">
          <span className="mr-2 sm:mr-4 text-sm sm:text-base">Welcome, {name}!</span>
          <ModeToggle />
          <Button onClick={logoutHandler} className="cursor-pointer text-sm sm:text-base px-3 sm:px-4">
            Logout
          </Button>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-end">
          <ModeToggle />
          <Button onClick={login} className="cursor-pointer text-sm sm:text-base px-3 sm:px-4">
            Login
          </Button>
          <Button onClick={signup} variant="ghost" className="cursor-pointer text-sm sm:text-base px-3 sm:px-4">
            Signup
          </Button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
