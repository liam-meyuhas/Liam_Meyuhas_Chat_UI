import React, { useState } from "react";
import "../GlobalCss/Modals.css";
import "./ChangeBotName.css";

const ChangeBotName = ({ setBotName, botName }) => {
  const [showModal, setShowModal] = useState(false);
  const [newBotName, setNewBotName] = useState(botName);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const save = () => {
    setBotName(newBotName);
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
