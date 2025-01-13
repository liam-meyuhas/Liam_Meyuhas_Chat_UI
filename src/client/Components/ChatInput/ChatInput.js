import React, { useState, useEffect, useRef } from "react";
import { FaRegPaperPlane } from "react-icons/fa";
import "./ChatInput.css";
import { ImAttachment } from "react-icons/im";
import ChatResponse from "../ChatResponse";
import clsx from "clsx";
import { alpha } from "@mui/material";

function ChatInput({
  response,
  setResponse,
  isLightMode,
  isActiveMode,
  faq,
  showGif,
  setShowGif,
  fname,
}) {
  const [input, setInput] = useState("");
  const displayTextRef = useRef(null);
  const [direction, setDirection] = useState("rtl");
  const [isFocused, setIsFocused] = useState(false);

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

  const handleIconClick = async () => {
    if (input) {
      const st_url = "http://localhost:5000/chatResponse";

      const newObject = { input: input, answer: "מחכה לתשובה..." };
      setResponse((prevResponse) => [...prevResponse, newObject]);

      try {
        const response = await fetch(st_url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(input),
        });

        const data = await response.json();
        console.log("Response saved:", data);

        const answer = data.choices[0].message.content;
        const updatedObject = { input: input, answer: answer };

        await sendToServer(updatedObject, answer);

        setResponse((prevResponse) => {
          const updatedResponse = [...prevResponse];
          updatedResponse[updatedResponse.length - 1] = updatedObject;
          return updatedResponse;
        });

        setInput("");
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const sendToServer = async (updatedObject, answer) => {
    try {
      const response = await fetch("http://localhost:5000/QnA", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: updatedObject.input,
          answer: answer,
          date: new Date().toLocaleString("he-IL", { hour12: false }),
        }),
      });
      const data = await response.json();
      console.log("QnA sent successfully:", data);
    } catch (error) {
      console.error("Error sending QnA:", error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") handleIconClick();
  };

  return (
    <div className="input-container">
      {response.length > 0 && (
        <div
          className={clsx(
            "display-text",
            { "display-text-red": isActiveMode },
            {
              "display-text-light": isLightMode,
            }
          )}
          data-testid="display-text"
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
              fname={fname}
            />
          ))}
        </div>
      )}
      <div className="input-wrapper">
        <input
          type="text"
          value={input}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyPress}
          data-testid="chat-input"
          placeholder={`${
            direction === "rtl" ? "שאל אותי כל דבר..." : "Ask me anything..."
          }`}
          className={clsx(
            direction === "rtl" ? "input-box" : "input-box-english",
            isLightMode && "input-box-light input-box-english-light"
          )}
          style={{
            direction: direction,
            width: isFocused ? "600px" : "300px",
            transition: "width 0.4s ease-in-out",
          }}
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
    </div>
  );
}

export default ChatInput;
