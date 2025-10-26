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
    <div className="mx-auto w-4xl p-2">



        <div className="flex  gap-3 mt-5 justify-end">

          <Button onClick={login} className="cursor-pointer">
            Login
          </Button>
          <Button onClick={signup} variant="ghost" className="cursor-pointer">
            Signup
          </Button>
        </div>

    </div>
  )
}

export default LandingNav
