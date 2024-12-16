import React, { useState, useEffect, useRef } from "react";
import { FaRegPaperPlane } from "react-icons/fa";
import "./ChatInput.css";
import { ImAttachment } from "react-icons/im";
import ChatResponse from "../ChatResponse";
import clsx from "clsx";

function ChatInput({
  response,
  setResponse,
  isLightMode,
  isActiveMode,
  faq,
  showGif,
  setShowGif,
}) {
  const [input, setInput] = useState("");
  const displayTextRef = useRef(null);
  const [direction, setDirection] = useState("rtl");
  const [isResizeable, setIsResizeable] = useState(false);

  const handleLanguageDirection = (value) => {
    if (value === "") {
      setDirection("rtl");
    } else {
      const isHebrew = /[\u0590-\u05FF]/.test(value);
      setDirection(isHebrew ? "rtl" : "ltr");
    }
  };

  useEffect(() => {
    if (displayTextRef.current) {
      displayTextRef.current.scrollTop = displayTextRef.current.scrollHeight;
    }
  }, [response, showGif]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInput(newValue);
    handleLanguageDirection(newValue);
  };

  const handleIconClick = () => {
    if (input) {
      const answer = faq[input] || "לא מצאתי תשובה לשאלה שלך.";

      const newObject = { input: input, answer: answer };

      setResponse([...response, newObject]);

      setInput("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") handleIconClick();
  };

  return (
    <div className="input-container">
      <div className="input-wrapper">
        <input
          type="text"
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          placeholder={`${
            direction === "rtl" ? "שאל אותי כל דבר..." : "Ask me anything..."
          }`}
          className={clsx(
            direction === "rtl" ? "input-box" : "input-box-english",
            isLightMode && "input-box-light input-box-english-light"
          )}
          style={{ direction: direction }}
        />
        <FaRegPaperPlane
          className={clsx(
            direction === "rtl" ? "input-icon" : "input-icon-english"
          )}
          onClick={handleIconClick}
        />
        <ImAttachment
          className={clsx(
            direction === "rtl" ? "input-icon-english" : "input-icon"
          )}
        />
      </div>
      {response.length > 0 && (
        <div
          className={clsx(
            "display-text",
            { "display-text-red": isActiveMode },
            {
              "display-text-light": isLightMode,
            }
          )}
          ref={displayTextRef}
          style={{ direction: direction }}
        >
          {response.map((res) => (
            <ChatResponse
              key={res.input}
              input={res.input}
              answer={res.answer}
              isLightMode={isLightMode}
              response={response}
              setResponse={setResponse}
              faq={faq}
              showGif={showGif}
              setShowGif={setShowGif}
            />
          ))}
        </div>
      )}
      <div>blablabla</div>
    </div>
  );
}

export default ChatInput;
