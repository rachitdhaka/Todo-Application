import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"
const Hero = () => {
  const navigate = useNavigate();

  const login = () => {
    navigate("/login");
  }

  return (
    <div className="relative gap-3 sm:gap-4 w-full mt-12 sm:mt-20 md:mt-32 lg:mt-48 flex flex-col justify-center items-center text-center px-4 sm:px-6">
      <div className="flex flex-col selection:bg-white">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-neutral-800 leading-tight">
          <span className="instrument-serif-regular">
            Welcome to the Todo Application
          </span>
        </h1>
        <p className="font-thin text-sm sm:text-base md:text-lg lg:text-xl manrope-regular text-neutral-600 mt-2 sm:mt-3 md:mt-4 px-2 sm:px-4">
          This is a simple todo application built using{" "}
          <span className="text-black font-bold">MERN</span> Stack
        </p>
      </div>

      <Button onClick={login} className="mt-3 sm:mt-4 cursor-pointer text-sm sm:text-base px-4 sm:px-6">Get Started</Button>
    </div>
  );
};

export default Hero;


