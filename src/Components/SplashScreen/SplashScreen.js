import React, { useState, useEffect } from "react";
import "./SplashScreen.css";
import israelGif from "../../videos/israel.gif";

const SplashScreen = ({ isLoading, setIsLoading }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="splash-screen" data-testid="splash-screen">
      <img src={`${israelGif}`} alt="Israel-Gif" className="im"></img>
    </div>
  );
};

export default SplashScreen;
