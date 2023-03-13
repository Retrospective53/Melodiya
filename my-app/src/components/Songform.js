import Image from "next/image";
import React, { useState } from "react";
import musicServices from "../services/music";
import ImageBuffer from "./ImageBuffer";

const Songform = () => {
  const [file, setFile] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [uploadImageUrl, setUploadImageUrl] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileImgChange = (e) => {
    setUploadImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  const uploadImageForm = () => {
    return (
      <div className="flex flex-col space-y-4">
        <div>
          <label htmlFor="file-input">Choose an image file:</label>
          <input type="file" id="file-input" onChange={handleFileImgChange} />
        </div>
      </div>
    );
  };

  const handleFileUpload = async () => {
    const response = await musicServices.getSongMetadata(file);
    setMetadata(response);
  };

  const uploadForm = ({ metadata }) => {
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
            placeholder="Enter title"
            defaultValue={metadata?.common.title}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="genre" className="text-gray-600 font-medium">
            Genre
          </label>
          <input
            type="genre"
            id="genre"
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter genre"
            defaultValue={metadata?.common.genre.join(", ")}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="message" className="text-gray-600 font-medium">
            Desription
          </label>
          <textarea
            id="message"
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="5"
            placeholder="Describe your song"
          />
        </div>
        <div>
          <input
            type="radio"
            id="private"
            value="private"
            name="privacy"
            defaultChecked={true}
          />
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
          <div className="col-span-2">
            {metadata && metadata.common.picture ? (
              <ImageBuffer imageBuffer={metadata.common.picture[0].data.data} />
            ) : (
              <div>
                {uploadImageUrl && (
                  <Image
                    src={uploadImageUrl}
                    alt="uploaded image"
                    width={300}
                    height={300}
                  />
                )}
                {uploadImageForm()}
              </div>
            )}
          </div>
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
            <div>{uploadForm({ metadata })}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Songform;
