import React, { useState, useEffect } from "react";
import { SlLike, SlDislike } from "react-icons/sl";
import { IoCopyOutline, IoReloadSharp } from "react-icons/io5";
import { SiZcool } from "react-icons/si";
import clsx from "clsx";
import "./index.css";
import ChangeResponse from "../ChangeResponse";
import loading from "../videos/loading.gif";

const ChatResponse = ({
  input,
  answer,
  isLightMode,
  response,
  setResponse,
  faq,
  showGif,
  setShowGif,
}) => {
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    setShowGif(true);
    const timerGif = setTimeout(() => {
      setShowGif(false);
      setShowAnswer(true);
    }, 3000);
    return () => clearTimeout(timerGif);
  }, [response]);

  const detectLanguage = (text) => {
    const hebrewPattern = /[\u0590-\u05FF]/;
    return hebrewPattern.test(text) ? "hebrew" : "english";
  };

  return (
    <div
      className={`chat-response ${
        detectLanguage(input) === "hebrew" ? "rtl" : "ltr"
      }`}
    >
      <div
        className={clsx("question", {
          "question-light": isLightMode,
        })}
      >
        <span className="icons">ליאם:</span>
        {input}
      </div>

      {!showAnswer && showGif && (
        <img src={`${loading}`} alt="loading-Gif" className="gif-loading"></img>
      )}

      {showAnswer && (
        <div>
          <span>
            <ChangeResponse
              response={response}
              setResponse={setResponse}
              faq={faq}
            />
          </span>
          <span className="icons">
            אלפי
            <SiZcool />
          </span>
          {answer}
        </div>
      )}
      {showAnswer && (
        <div className="icons">
          <span className="icons-positive" title="תגובה טובה">
            <SlLike />
          </span>
          <span className="icons-negative" title="תגובה גרועה">
            <SlDislike />
          </span>
          <span className="icons">
            <IoCopyOutline />
          </span>
          <span className="icons">
            <IoReloadSharp />
          </span>
        </div>
      )}
    </div>
  );
};

export default ChatResponse;
