"use client"
import React, { useState } from "react";
import RoleSelection from "./components/RoleSelection";
import ToolsSelection from "./components/ToolsSelection";
import IndustrySelection from "./components/IndustrySelection";
import Results from "./components/Results";

interface UserSelections {
  roles: Array<{ value: string; label: string }>;
  tech: Array<{ value: string; label: string }>;
  industries: Array<{ value: string; label: string }>;
}

export default function Home() {
  // get started button that leads user to linear progression of 
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isStarted, setIsStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [userSelections, setUserSelections] = useState<UserSelections>({
    roles: [],
    tech: [],
    industries: [],
  })
  // if not logged in, get started isn't reachable and prompt them to log in
  const setUserChoices = (category : keyof UserSelections, choices : Array<{ value: string; label: string }>) => {
    setUserSelections((prevSelections) => ({
      ...prevSelections,
      [category]: choices,
    }))
  }
  // get started -> role -> tools/tech -> industries that interest them -> generate results that are downloadable
  const steps = [
    { title: "Select Your Desired Role(s)", content: 
      <RoleSelection 
        userChoices={userSelections.roles}
        onChoiceChange={(choices) => setUserChoices("roles", choices)}
        /> },
    { title: "Choose Tools/Tech", content: <ToolsSelection /> },
    { title: "Select Industries", content: <IndustrySelection /> },
    { title: "Generate Results", content: <Results /> },
  ];

  const handleGetStarted = () => {
    setIsStarted(true);
  }

  const handleNext = () => {
    console.log(userSelections);
    setCurrentStep((prevStep) => prevStep + 1);
  }

  const handlePrev = () => {
    setCurrentStep((prevStep => prevStep - 1));
  }
  return (
    <div className="flex justify-center min-h-screen">
      <div className="content-center mx-auto px-4 text-slate-100 sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-8/12">
        <h1 className="text-4xl font-bold mt-10">Welcome to our Brainstorming App!</h1>
        <p className="mt-4">Your guide to exploring tech careers as a student.</p>
        {isStarted ?
        <>
          <div className="mt-10 h-fit bg-primary-100 border border-slate-500 text-slate-100 shadow-md rounded ">
            {isLoggedIn && steps[currentStep] && (
              <div className="w-full mb-10 h-80 p-5">
                <h2 className="text-2xl font-semibold">{steps[currentStep].title}</h2>
                {steps[currentStep].content}
              </div>
            )}
            <div className="flex content-baseline justify-end m-3 p-3">
              <div className="ml-3 mr-3">
                <button onClick={handlePrev} className="justify-self-start bg-secondary-100 hover:bg-secondary-200 hover:outline text-slate-100 pl-3 pr-3 pt-1 pb-1 rounded">
                  Back
                </button>
              </div>
              <div className="justify-end">
                <button onClick={handleNext} className="bg-secondary-100 hover:bg-secondary-200 hover:outline text-slate-100 pl-3 pr-3 pt-1 pb-1 rounded">
                  Next
                </button>
              </div>
            </div>
          </div>
        </> : 
         <>
         <button onClick={handleGetStarted} className="mt-10 h-10 rounded-lg bg-white hover:bg-secondary-100 hover:text-slate-100 hover:border font-bold px-5 text-black">Get Started</button>
         </>}
      </div>
    </div>
  );
}
