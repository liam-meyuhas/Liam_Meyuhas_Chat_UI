import React, {useState} from 'react';
import {FiUser} from 'react-icons/fi';
import '../GlobalCss/Modals.css';
import './Avatar.css';

const Avatar = ({setUserIcon}) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <button className="Button" onClick={openModal}>
        אווטר
      </button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>בחר את האווטר שלך:</p>
            <button
              className="avatar-icons "
              onClick={() => setUserIcon('👦🏿')}
            >
              👦🏿
            </button>
            <button
              className="avatar-icons "
              onClick={() => setUserIcon('👸🏻')}
            >
              👸🏻
            </button>
            <button
              className="avatar-icons "
              onClick={() => {
                setUserIcon('👸🏿');
              }}
            >
              👸🏿
            </button>

            <button
              className="avatar-icons"
              onClick={() => setUserIcon('👦🏻')}
            >
              👦🏻
            </button>
            <button
              className="avatar-icons"
              onClick={() =>
                setUserIcon(<FiUser className="icon-profile"/>)
              }
            >
              <FiUser/>
            </button>

            <div className="save-container">
              <button className="Button" onClick={closeModal}>
                צא
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Avatar;