import React, { useState, useEffect } from "react";
import { SlLike, SlDislike } from "react-icons/sl";
import { IoCopyOutline, IoReloadSharp } from "react-icons/io5";
import clsx from "clsx";
import "./index.css";
import ChangeResponse from "../ChangeResponse/ChangeResponse";
import loading from "../../videos/loading.gif";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";

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
  const [open, setOpen] = useState(false);

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
            <SlDislike onClick={() => setOpen(true)} />
            <Dialog open={open} onClose={() => setOpen(false)}>
              <DialogTitle>הוסף תגובה רעה</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  This is an example of how you can click an icon to open a
                  dialog. You can place any content you want here.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpen(false)} color="primary">
                  Close
                </Button>
              </DialogActions>
            </Dialog>
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
