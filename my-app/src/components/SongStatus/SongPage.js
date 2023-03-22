import { useState, useEffect } from "react";
import Image from "next/image";
import musicServices from "../../services/music";

const SongPage = ({ song }) => {
  const handleClickDelete = () => {
    musicServices.deleteSong(song.id);
  };

  const pictureUrl = `https://f005.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=${song.picture}`;
  if (!song) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-4 h-min-screen">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Image
            loader={() => pictureUrl}
            className="w-full rounded-lg shadow-lg"
            src={pictureUrl}
            alt={song.title}
            width={500}
            height={500}
          />
          <h1 className="mt-4 text-3xl font-bold">{song.title}</h1>
          <p className="text-gray-500">{song.genres.join(", ")}</p>
          <p className="mt-4 text-lg">{song.duration} seconds</p>
          <p className="text-lg">{song.playCount} plays</p>
          <div className="mt-4">
            <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
              Play
            </button>
          </div>
          <div className="mt-4" onClick={handleClickDelete}>
            <button className=" text-white font-bold py-2 px-4 rounded bg-red-800">
              Delete Song
            </button>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Comments</h2>
          {song.comments.length > 0 ? (
            song.comments.map((comment) => (
              <div key={comment.id} className="border-b py-2">
                <p className="text-lg font-bold">{comment.user}</p>
                <p>{comment.text}</p>
              </div>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
          <form className="mt-4" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col">
              <label className="text-lg font-bold">Add a comment</label>
              <textarea className="mt-2 border rounded p-2"></textarea>
              <button className="mt-2 bg-blue-500 text-white font-bold py-2 px-4 rounded">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SongPage;
