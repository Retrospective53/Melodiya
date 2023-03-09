import React, { useState } from "react";
import musicServices from "../services/music";

const Songform = () => {
  const [file, setFile] = useState(null);
  const [metadata, setMetadata] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    const response = await musicServices.getSongMetadata(file);
    setMetadata(response);
  };

  const uploadForm = () => {
    return (
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="name" className="text-gray-600 font-medium">
            Title
          </label>
          <input
            type="text"
            id="name"
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your name"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="email" className="text-gray-600 font-medium">
            Genre
          </label>
          <input
            type="email"
            id="email"
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your email"
          />
        </div>
        <label htmlFor="email" className="text-gray-600 font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter your email"
        />
        <div className="flex flex-col space-y-2">
          <label htmlFor="message" className="text-gray-600 font-medium">
            Desription
          </label>
          <textarea
            id="message"
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="5"
            placeholder="Enter your message"
          />
        </div>
        <div>
          <input type="radio" id="private" value="private" name="privacy" />
          <label htmlFor="private">Private</label>
          <br />
          <input type="radio" id="public" value="public" name="privacy" />
          <label htmlFor="public">Public</label>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
        >
          Submit
        </button>
      </div>
    );
  };

  return (
    <div className="w-full lg:h-screen">
      <div className="flex flex-col items-center m-auto w-full max-w-[1240px]">
        <div className="w-9/12 grid lg:grid-cols-5 gap-8">
          <div className="col-span-2">Image</div>
          <div className="col-span-3">
            <label htmlFor="file-input">Choose a file:</label>
            <input type="file" id="file-input" onChange={handleFileChange} />
            <button type="button" onClick={handleFileUpload}>
              Upload
            </button>
            <button
              onClick={() => {
                console.log(metadata);
              }}
            >
              Metadata
            </button>
            <div>{uploadForm()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Songform;
