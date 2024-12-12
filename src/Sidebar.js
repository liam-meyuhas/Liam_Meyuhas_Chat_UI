import React, { useEffect, useRef } from "react";
import "./Sidebar.css";
import clsx from "clsx";
import NewChatButton from "./NewChatButton";

const Sidebar = ({ isLightMode, handleReset, allChats, showChat }) => {
  const messagesEndRef = useRef(null);

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
          {allChats?.map((chat) => (
            <button onClick={() => showChat(chat)} ref={messagesEndRef}>
              צ'אט
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
