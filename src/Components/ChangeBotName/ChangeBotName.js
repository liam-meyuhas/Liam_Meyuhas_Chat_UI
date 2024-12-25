import React, { useState, useEffect } from "react";
import "../GlobalCss/Modals.css";
import "./ChangeBotName.css";

const ChangeBotName = ({ setBotName, botName }) => {
  const [showModal, setShowModal] = useState(false);
  const [newBotName, setNewBotName] = useState("");

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const save = () => {
    fetch("http://localhost:5000/api/botname", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newBotName }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error updating bot name");
        }
        return response.json();
      })
      .then((data) => {
        setBotName(data.name);
        setNewBotName("");
      })
      .catch((error) => {
        console.error("Error updating botname:", error);
      });
    setShowModal(false);
  };
  return (
    <>
      <button className="Button" onClick={openModal}>
        שנה שם
      </button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>שנה שם בוט:</p>
            <input
              type="text"
              placeholder="שנה שם..."
              onChange={(e) => setNewBotName(e.target.value)}
              className="change-bot-input"
            />
            <button className="Button" onClick={save}>
              שמור
            </button>
            <button className="Button" onClick={closeModal}>
              צא
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChangeBotName;
