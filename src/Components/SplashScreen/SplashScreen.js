import React, { useEffect } from "react";
import "./SplashScreen.css";
import alpha from "../../videos/alpha.gif";

const SplashScreen = ({ isLoading, setIsLoading }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="splash-screen">
      <img src={`${alpha}`} alt="alpha-Gif" className="gif-size"></img>
    </div>
  );
};

export default SplashScreen;
