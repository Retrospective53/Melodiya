import React from "react";

const SongCard = ({ song }) => {
  const pictureUrl = `https://f005.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=${song.picture}`;

  return (
    <div className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white min-h-screen">
      <div className="relative pb-9/16">
        <img
          className="absolute h-full w-full object-cover"
          src={pictureUrl}
          alt="Song cover"
        />
      </div>
      <div className="p-4">
        <h2 className="text-gray-800 font-bold text-xl mb-2">{song.title}</h2>
        <div className="flex items-center mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4-4 4 4m0 6l-4-4-4 4"
            />
          </svg>
          <span className="text-gray-600 font-medium">{song.likes.length}</span>
        </div>
        <div className="flex items-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l4.5-4.5L14 15"
            />
          </svg>
          <span className="text-gray-600 font-medium">{song.playCount}</span>
        </div>
        <div className="flex items-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <span className="text-gray-600 font-medium">{song.duration}s</span>
        </div>
        <button className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded">
          Play
        </button>
      </div>
    </div>
  );
};

export default SongCard;
