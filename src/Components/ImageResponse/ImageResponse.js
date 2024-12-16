import React from "react";
import wolf from "../../images/wolf.jpeg";
import "../GlobalCss/Responses.css";

const ImageResponse = () => {
  return (
    <div>
      <img src={`${wolf}`} alt="Tree-Image" className="image-response"></img>
    </div>
  );
};

export default ImageResponse;
