import React, { useState } from "react";
import Hero from "../components/Hero";
import bg from "../assets/image/bg.png";
import LandingNavbar from "../components/LandingNavbar";



const LandingPage = () => {

  return (
    <div className="relative w-full flex flex-col justify-center items-center bg-gradient-to-b from-amber-100 via-sky-200 to-gray-100 overflow-hidden">


      {/* Decorative lines */}
      <div className="absolute inset-0 max-w-4xl mx-auto w-full">
        <div className="absolute inset-y-0 left-0 h-full w-px bg-gradient-to-b from-transparent via-neutral-400/40 to-transparent"></div>
        <div className="absolute inset-y-0 right-0 h-full w-px bg-gradient-to-b from-transparent via-neutral-400/40 to-transparent"></div>
      </div>

      {/* Diagonal stripe pattern */}
      <div className="absolute inset-0 z-0 bg-[repeating-linear-gradient(135deg,rgba(0,0,0,0.03)_0,rgba(0,0,0,0.03)_1px,transparent_1px,transparent_20px)] pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col">
        <LandingNavbar onLoginClick={() => setShowLogin(true)} />  
        <Hero />

        {/* bg image */}
        <div className="mt-30">
          <img
            src={bg}
            alt=""
            className="rounded-xl border border-neutral-300"
            height={1000}
            width={700}
          />
        </div>
      </div>


    </div>
  );
};

export default LandingPage;
