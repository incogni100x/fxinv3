"use client";
import React, { useEffect, useState } from "react";

export default function ProgressBar() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  useEffect(() => {
    // Function to fetch current step from sessionStorage
    const fetchCurrentStep = () => {
      const step = Number(sessionStorage.getItem("authStep")) || 1;
      setCurrentStep(step);
    };

    // Fetch initial step value on component mount
    fetchCurrentStep();

    // Set up a polling interval to fetch changes every second
    const intervalId = setInterval(fetchCurrentStep, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full h-2 mt-4 bg-black rounded-full">
      <div
        className="rounded-full h-2 bg-warning-400 transition-all duration-500 ease-out"
        style={{ width: `${progressPercentage}%` }}
      ></div>
    </div>
  );
}
