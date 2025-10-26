import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"
const Hero = () => {
  const navigate = useNavigate();

  const login = () => {
    navigate("/login");
  }

  return (
    <div className="relative gap-4 w-full mt-20 sm:mt-32 md:mt-40 lg:mt-60 flex flex-col justify-center items-center text-center px-4">
      <div className="flex flex-col selection:bg-white">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl  text-neutral-800">
          <span className="instrument-serif-regular">
            Welcome to the Todo Application
          </span>
        </h1>
        <p className="font-thin text-base sm:text-lg md:text-xl manrope-regular text-neutral-600 mt-2 sm:mt-3 md:mt-4 px-2">
          This is a simple todo application built using{" "}
          <span className="text-black font-bold">MERN</span> Stack
        </p>
      </div>

      <Button onClick={login} className="mt-4 cursor-pointer">Button</Button>
    </div>
  );
};

export default Hero;


