import React from "react";
import israelGif from "../../videos/israel.gif";
import "../GlobalCss/Responses.css";

const VideoResponse = () => {
  return (
    <div>
      <img src={`${israelGif}`} alt="Israel-Gif" className="gif-response"></img>
    </div>
  );
};

export default VideoResponse;
