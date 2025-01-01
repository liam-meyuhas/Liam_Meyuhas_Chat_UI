import React, { useState, useEffect } from "react";
import { SlLike } from "react-icons/sl";
import { IoCopyOutline, IoReloadSharp } from "react-icons/io5";
import clsx from "clsx";
import "./index.css";
import ChangeResponse from "../ChangeResponse/ChangeResponse";
import loading from "../../videos/loading.gif";
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
}) => {
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    const sendToServer = async () => {
      try {
        const response = await fetch("http://localhost:5000/QnA", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: input,
            answer: answer,
            date: new Date(),
          }),
        });
        const data = await response.json();
        console.log("QnA sent successfully:", data);
      } catch (error) {
        console.error("Error sending QnA:", error);
      }
    };

    sendToServer();
  }, [input]);

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
        <span className="icons">ליאם</span>
        {input}
      </div>

      {!showAnswer && showGif && (
        <img src={`${loading}`} alt="loading-Gif" className="gif-loading"></img>
      )}

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
          {answer}
        </>
      )}
      {showAnswer && (
        <div className="icons">
          <span className="icons-positive" title="תגובה טובה">
            <SlLike />
          </span>
          <span className="icons-negative" title="תגובה גרועה">
            <BadComment />
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
