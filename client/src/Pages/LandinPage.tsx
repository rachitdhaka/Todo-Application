import React, { useState } from "react";
import Hero from "../components/Hero";
import bg from "../assets/images/bg.png";
import LandingNav from "./LandingNav";




const LandingPage = () => {

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-amber-100 via-sky-200 to-gray-100 overflow-hidden px-4 sm:px-6 lg:px-8">


      {/* Decorative lines - hidden on mobile */}
      <div className="absolute inset-0 max-w-4xl mx-auto w-full hidden md:block">
        <div className="absolute inset-y-0 left-0 h-full w-px bg-gradient-to-b from-transparent via-neutral-400/40 to-transparent"></div>
        <div className="absolute inset-y-0 right-0 h-full w-px bg-gradient-to-b from-transparent via-neutral-400/40 to-transparent"></div>
      </div>

      {/* Diagonal stripe pattern */}
      <div className="absolute inset-0 z-0 bg-[repeating-linear-gradient(135deg,rgba(0,0,0,0.03)_0,rgba(0,0,0,0.03)_1px,transparent_1px,transparent_20px)] pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col w-full max-w-4xl">
        <LandingNav />
        <Hero />

        {/* bg image */}
        <div className="mt-10 sm:mt-20 md:mt-30 mb-8 sm:mb-12 flex justify-center">
          <img
            src={bg}
            alt="Todo App Preview"
            className="rounded-xl border border-neutral-300 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl h-auto"
          />
        </div>
      </div>


    </div>
  );
};

export default LandingPage;
