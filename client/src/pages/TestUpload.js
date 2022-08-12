import React, { useState, useRef } from "react";
import ImageUpload from "../components/ImageUpload";

const TestUpload = () => {
  const [imageUrl, setImageUrl] = useState('');

  return (
  <div>
    <ImageUpload getUrlFromS3={setImageUrl}/>
  </div>)
};
export default TestUpload;
