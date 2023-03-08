import React, { useState } from "react";
import musicServices from "../services/music";

const Songform = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    musicServices.getSongMetadata(file);
  };
  return (
    <div className="h-full w-full">
      <div>
        <label htmlFor="file-input">Choose a file:</label>
        <input type="file" id="file-input" onChange={handleFileChange} />
        <button type="button" onClick={handleFileUpload}>
          Upload
        </button>
      </div>
    </div>
  );
};

export default Songform;
