import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative gap-4 w-full mt-20 sm:mt-32 md:mt-40 lg:mt-60 flex flex-col justify-center items-center text-center px-4">
      <div className="flex flex-col selection:bg-white">
        <h1 className="playfair-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
          Welcome to the Todo Application
        </h1>
        <p className="font-thin text-base sm:text-lg md:text-xl manrope-regular text-neutral-600 mt-2 sm:mt-3 md:mt-4 px-2">
          This is a simple todo application built using <span className="text-black font-bold">MERN</span> Stack
        </p>
      </div>

      <button
        onClick={() => navigate("/view")}
        className="relative text-sm sm:text-base md:text-md geist bg-white text-neutral-800 px-4 py-2 sm:px-6 sm:py-3 rounded-xl cursor-pointer border border-neutral-100 shadow-md hover:shadow-lg hover:bg-gray-100 transition duration-300 mt-4">
        Get Started


        <div className="absolute -bottom-2px inset-x-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
      </button>
    </div>
  );
};

export default Hero;
