import React, { useState, useEffect } from "react";
import { SlLike } from "react-icons/sl";
import { IoCopyOutline, IoReloadSharp } from "react-icons/io5";
import clsx from "clsx";
import "./index.css";
import ChangeResponse from "../ChangeResponse/ChangeResponse";
import loading from "../../videos/loading.gif";
import alphaloop from "../../videos/alphaloop.gif";
import BadComment from "../BadComment/BadComment";

const ChatResponse = ({
  input,
  answer,
  isLightMode,
  response,
  setResponse,
  faq,
  showGif,
  setShowGif,
  fname,
}) => {
  const [showAnswer, setShowAnswer] = useState(false);
  useEffect(() => {
    setShowGif(true);
    const timerGif = setTimeout(() => {
      setShowGif(false);
      setShowAnswer(true);
    }, 5000);
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
        <span className="icons">ליאם</span>
        <span data-testid='question'>{input}</span>
      </div>

      {!showAnswer &&
        showGif &&
        (typeof answer === "string" ? (
          <img src={loading} alt="loading-Gif" className="gif-loading" />
        ) : (
          <img
            src={alphaloop}
            alt="loading-Gif"
            className="alpha-gif-loading"
          />
        ))}

      {showAnswer && (
        <>
          <span>
            <ChangeResponse
              response={response}
              setResponse={setResponse}
              faq={faq}
            />
          </span>
          <span className="icons">אלפי</span>
          <span data-testid='answer'>{answer}</span>
        </>
      )}
      {showAnswer && (
        <div className="icons">
          <span className="icons-positive" title="תגובה טובה">
            <SlLike />
          </span>
          <span className="icons-negative" title="תגובה גרועה">
            <BadComment fname={fname} />
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
