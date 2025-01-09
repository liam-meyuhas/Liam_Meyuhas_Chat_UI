import React, { useState } from "react";
import { FiUser } from "react-icons/fi";
import "./UserIcon.css";
import ChangeBotName from "../ChangeBotName/ChangeBotName";
import Avatar from "../Avatar/Avatar";
import ActiveMode from "../ActiveMode/ActiveMode";
import {Button} from '@mui/material';

const UserIcon = ({ setIsLightMode, setBotName, setIsActiveMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMode = () => {
    setIsLightMode((prevMode) => !prevMode);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const [userIcon, setUserIcon] = useState(() => (
    <FiUser className="icon-profile" />
  ));

  return (
    <div className="theme-container">
      <button
        className="profile"
        onClick={toggleMenu}
        title="ליאם מיוחס/יחידת אוצר/צוות מטמון"
        data-testid="user-icon"
      >
        <span className="avatar-icon-profile">{userIcon}</span>
      </button>

      {menuOpen && (
        <div className="user-container">
          <Button onClick={toggleMode}>
            ערכת נושא
          </Button>
          <ChangeBotName setBotName={setBotName} />
          <Avatar setUserIcon={setUserIcon} />
          <ActiveMode setIsActiveMode={setIsActiveMode} />
        </div>
      )}
    </div>
  );
};
export default UserIcon;
