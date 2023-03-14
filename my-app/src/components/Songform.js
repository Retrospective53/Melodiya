import Image from "next/image";
import React, { useState, useRef } from "react";
import musicServices from "../services/music";
import ImageBuffer from "./ImageBuffer";
import { Buffer } from "buffer";

const Songform = () => {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const [song, setSong] = useState(null);
  const [image, setImage] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [uploadImageUrl, setUploadImageUrl] = useState(null);

  const handleFileImgChange = (e) => {
    // const idk = async (imageBuffer) => {
    //   const base64Image = await Buffer.from(imageBuffer).toString("base64");
    //   const imageUrl = `data:image/jpeg;base64,${base64Image}`;
    //   setUploadImageUrl(imageUrl);
    // };
    // metadata && metadata.common.picture
    //   ? idk(metadata.common.picture[0].data.data)
    setUploadImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  const handleFileInput = async (e) => {
    const selectedFile = e.target.files[0];
    await setSong(selectedFile);
    const response = await musicServices.getSongMetadata(selectedFile);
    setMetadata(response);
    response.common.picture && setImage(response.common.picture[0]);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const songAndImage = [song, image];
    const songData = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      duration: Math.round(metadata.format.duration),
      // genres: song.genres,
    };

    const buffer = await Buffer.from(metadata.common.picture[0].data.data);
    const blob = new Blob([buffer], {
      type: metadata.common.picture[0].format,
    });

    const files = new FormData();
    await files.append("files", song);
    await files.append("files", blob, 
      `${titleRef.current.value}.jpg`,
    );
    await files.append("files", JSON.stringify(songData))

    const response = await musicServices.uploadSong(files);
    console.log(response);
  };

  const uploadForm = ({ metadata }) => {
    return (
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="name" className="text-gray-600 font-medium">
              Title
            </label>
            <input
              ref={titleRef}
              type="text"
              id="name"
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter title"
              defaultValue={metadata?.common.title}
            />
            <div>{`${Math.round(metadata.format.duration)} seconds`}</div>
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
              ref={descriptionRef}
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
        </form>
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
            <label htmlFor="file-input">Choose a song:</label>
            <input type="file" id="file-input" onInput={handleFileInput} />
            <button
              onClick={() => {
                console.log(metadata);
              }}
            >
              Metadata
            </button>
            <div>{metadata && uploadForm({ metadata })}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Songform;
