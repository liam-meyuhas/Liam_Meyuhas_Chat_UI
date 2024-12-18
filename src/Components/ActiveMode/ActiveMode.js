import React from "react";
import "../GlobalCss/Modals.css";

const ActiveMode = ({ setIsActiveMode }) => {
  const activeMode = () => {
    setIsActiveMode((prevState) => !prevState);
  };

  return (
    <>
      <button className="Button" onClick={activeMode}>
        מבצעי
      </button>
    </>
  );
};

export default ActiveMode;
