import React, { useState } from "react";
import { LuPencilLine } from "react-icons/lu";
import "./ChangeResponse.css";

const ChangeResponse = ({ response, setResponse, faq }) => {
  const [isChangeResponse, setIsChangeResponse] = useState(false);
  const [newResponse, setNewResponse] = useState("");

  const changeResponse = () => {
    if (newResponse !== "") {
      const answer = faq[newResponse] || "לא מצאתי תשובה לשאלה שלך";
      const newObject = { input: newResponse, answer: answer };
      setResponse([...response, newObject]);
    }
    setIsChangeResponse(false);
  };

  const cancel = () => {
    setIsChangeResponse(false);
  };

  const toggleModal = () => {
    setIsChangeResponse(!isChangeResponse);
  };

  return (
    <>
      <button onClick={toggleModal} className="change-icon">
        <LuPencilLine />
      </button>
      {isChangeResponse && (
        <div className="modal-content">
          <p>שאל אותי מה שתרצה:</p>
          <textarea
            placeholder="כתוב כאן..."
            onChange={(e) => setNewResponse(e.target.value)}
            className="modal-input"
            rows="5"
          ></textarea>
          <div className="modal-buttons">
            <button onClick={changeResponse}>שנה</button>
            <button onClick={cancel}>ביטול</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChangeResponse;
