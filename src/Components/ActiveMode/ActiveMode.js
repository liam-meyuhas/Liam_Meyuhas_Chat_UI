import React from "react";
import "../GlobalCss/Modals.css";

const ActiveMode = ({ setIsActiveMode }) => {
  const activeMode = () => {
    setIsActiveMode((prevState) => !prevState);
  };

  return (
    <div>
      <button className="Button" onClick={activeMode}>
        מבצעי
      </button>
    </div>
  );
};

export default ActiveMode;
