import React, { useEffect, useRef, useState } from "react";
import "./Sidebar.css";
import clsx from "clsx";
import NewChatButton from "../NewChatButton/NewChatButton";
import { FcPrevious } from "react-icons/fc";
import {dates} from '../../resources/Sidebar';

const Sidebar = ({ isLightMode, handleReset, allChats, showChat }) => {
  const messagesEndRef = useRef(null);

  const calculateDaysAgo = timeStamp => {
    const now = new Date();
    const difference = now - new Date(timeStamp);
    const daysAgo = Math.floor(difference / (1000 * 60));

    if (daysAgo >= 60) return dates.twoMonths;
    if (daysAgo >= 30) return dates.month;
    if (daysAgo >= 28) return dates.fourWeeks;
    if (daysAgo >= 21) return dates.threeWeeks;
    if (daysAgo >= 14) return dates.twoWeeks;
    if (daysAgo >= 7) return dates.week;
    if (daysAgo === 1) return dates.yesterday;
    if (daysAgo === 0) return dates.today;

    return `לפני ${daysAgo} ימים`;
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
                {calculateDaysAgo(chat.timeStamp)}
                <FcPrevious />
              </span>
              <button onClick={() => showChat(chat.responses)} ref={messagesEndRef}>
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
