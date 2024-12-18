import React from "react";
import "../GlobalCss/Modals.css";
import "./ActiveMode.css";

const ActiveMode = ({ setIsActiveMode }) => {
  const activeMode = () => {
    setIsActiveMode((prevState) => !prevState);
  };

  return (
    <>
      <button className="active-mode" onClick={activeMode}>
        מבצעי
      </button>
    </>
  );
};

export default ActiveMode;
