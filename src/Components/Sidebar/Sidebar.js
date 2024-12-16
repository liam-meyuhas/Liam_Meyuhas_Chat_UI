import React, { useEffect, useRef, useState } from "react";
import "./Sidebar.css";
import clsx from "clsx";
import NewChatButton from "../NewChatButton/NewChatButton";
import { FcPrevious } from "react-icons/fc";

const Sidebar = ({ isLightMode, handleReset, allChats, showChat }) => {
  const messagesEndRef = useRef(null);
  const [chatTimeStamp, setChatTimeStamp] = useState([]);

  useEffect(() => {
    const now = new Date();

    setChatTimeStamp([...chatTimeStamp, now]);
  }, [allChats]);

  const calculateDaysAgo = (timeStamp) => {
    const now = new Date();
    const difference = now - new Date(timeStamp);
    const daysAgo = Math.floor(difference / (1000 * 60 * 60 * 24));

    if (daysAgo >= 60) return "2 Months";
    if (daysAgo >= 30) return "1 Month";
    if (daysAgo >= 28) return "4 Weeks";
    if (daysAgo >= 21) return "3 Weeks";
    if (daysAgo >= 14) return "2 Weeks";
    if (daysAgo >= 7) return "1 Week";

    return `${daysAgo} Days`;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [allChats]);

  return (
    <div className={clsx("sidebar", { "sidebar-light": isLightMode })}>
      <div className="sidebar-content">
        <NewChatButton handleReset={handleReset} />
        <div
          className={clsx("button-column", {
            "button-column-light": isLightMode,
          })}
        >
          {allChats?.map((chat, index) => (
            <div key={index}>
              <span>
                Previous
                {calculateDaysAgo(chatTimeStamp[index])}
                <FcPrevious />
              </span>
              <button onClick={() => showChat(chat)} ref={messagesEndRef}>
                צ'אט
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
