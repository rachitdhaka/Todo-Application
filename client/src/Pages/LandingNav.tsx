import { useEffect } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const LandingNav = () => {
    const [_name, _setName] = useState("");
  const [_isLoggedIn, _setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    const token = localStorage.getItem("token");

    if (storedName) {
      _setName(storedName);
    }

    _setIsLoggedIn(!!token);
  }, []);

  const login = () => {
    navigate("/login");
  };

  const signup = () => {
    navigate("/signup");
  };
  return (
    <div className="mx-auto max-w-4xl px-2 sm:px-4">
        <div className="flex flex-wrap gap-2 sm:gap-3 mt-3 sm:mt-5 justify-end">
          <Button onClick={login} className="cursor-pointer text-sm sm:text-base px-3 sm:px-4">
            Login
          </Button>
          <Button onClick={signup} variant="ghost" className="cursor-pointer text-sm sm:text-base px-3 sm:px-4">
            Signup
          </Button>
        </div>
    </div>
  )
}

export default LandingNav
