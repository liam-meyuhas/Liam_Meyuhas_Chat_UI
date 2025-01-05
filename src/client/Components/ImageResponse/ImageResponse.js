import React from "react";
import wolf from "../../images/wolf.jpeg";
import "../GlobalCss/Responses.css";

const ImageResponse = () => {
  return (
    <>
      <img src={`${wolf}`} alt="Tree-Image" className="image-response"></img>
    </>
  );
};

export default ImageResponse;
