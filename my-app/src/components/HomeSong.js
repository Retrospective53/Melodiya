import React, { useState, useEffect } from "react";
import musicServices from "@/services/music";
import Image from "next/image";
import Audioplayermelo from "./Audioplayermelo";

// return (
//   <div className="bg-slate-600">
//     <div>{title}</div>
//     <div>{duration}</div>
//     <div>{likes}</div>
//     <div>{playCount}</div>
//     <div>{picture && <img src={imgUrl} />}</div>
//   </div>
// );

const SongList = () => {
  const [selectedSong, setSelectedSong] = useState(null);
  const [musics, setMusics] = useState([]);
  const downloadUrlById =
    "https://f005.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=";

  const playList = selectedSong
    ? [
        {
          name: selectedSong.title,
          writer: "",
          img: `${downloadUrlById}${selectedSong.picture}`,
          src: `${downloadUrlById}${selectedSong.fileId}`,
          id: 1,
        },
      ]
    : null;

  useEffect(() => {
    const fetchData = async () => {
      const response = await musicServices.getMusic();
      setMusics(response);
    };
    fetchData();
  }, []);

  const musicList = (mList) => {
    const mock = {
      title: "curtain call",
      fileId:
        "4_z8e01a377aea4942481620a1b_f105fcdb9dd969bfa_d20230316_m182431_c005_v0501002_t0030_u01678991071632",
      likes: [],
      duration: 72,
      playlists: [],
      genres: [],
      playCount: 0,
      comments: [],
      picture:
        "4_z8e01a377aea4942481620a1b_f119830b52915f790_d20230316_m182428_c005_v0501003_t0022_u01678991068013",
      private: true,
      createdAt: "2023-03-16T18:24:33.528Z",
      updatedAt: "2023-03-16T18:24:33.528Z",
      id: "64135ee108cba8f12859b9b0",
    };

    const musicDisplay = (music) => {
      const { title, duration, likes, playCount, picture, fileId } = music;
      const imgUrl = `${downloadUrlById}${picture}`;

      const handleSongClick = () => {
        setSelectedSong(music);
      };
      return (
        <div
          onClick={handleSongClick}
          className="bg-gray-800 p-4 flex flex-col md:flex-row md:items-center cursor-pointer"
        >
          <div className="mb-4 md:mb-0 md:w-20 ">
            {picture && (
              <img className="w-full object-cover" src={imgUrl} alt={title} />
            )}
          </div>
          <div className="md:w-2/3 md:pl-4">
            <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
            <div className="flex items-center text-gray-400 mb-2">
              <svg
                className="w-4 h-4 fill-current mr-2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                <path d="M21 8a1 1 0 0 0-1-1h-1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V8z"></path>
              </svg>
              <span className="mr-4">{likes}</span>
              <svg
                className="w-4 h-4 fill-current mr-2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3 3h18v2H3V3zm0 6h12v2H3V9zm0 6h18v2H3v-2z"></path>
              </svg>
              <span className="mr-4">{playCount}</span>
              <svg
                className="w-4 h-4 fill-current mr-2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 5v14l11-7z"></path>
              </svg>
              <span>{duration}</span>
            </div>
            <div className="flex items-center text-gray-400">
              <svg
                className="w-6 h-6 fill-current mr-2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6 19h10l-5-6z"></path>
              </svg>
              <span>Repost</span>
              <svg
                className="w-6 h-6 fill-current ml-6 mr-2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16.667 2.019c.146 0 .287.026.42.078.133.052.252.127.355.224l4.625 4.626c.186.186.331.406.429.65.098.245.146.506.146.779 0 .273-.048.534-.146.78-.098.245-.243.464-.429.65L14.1464.626c-.195.196-.416.351-.65.449-.234.098-.477.146-.729.146-.252 0-.495-.048-.729-.146-.234-.098-.455-.253-.65-.449L3.958 7.186c-.103-.096-.222-.172-.355-.224-.133-.052-.274-.078-.42-.078-.146 0-.287.026-.42.078-.133.052-.252.128-.355.224L.227 11.713c-.186.186-.331.406-.429.65-.098.245-.146.506-.146.779 0 .273.048.534.146.78.098.245.243.464.429.65l4.625 4.626c.195.196.416.351.65.449.234.098.477.146.729.146.252 0 .495-.048.729-.146.234-.098.455-.253.65-.449l3.813-3.812V3.146c0-.552.448-1 1-1s1 .448 1 1v12.604l3.813 3.813c.195.196.416.351.65.449.234.098.477.146.729.146.252 0 .495-.048.729-.146.234-.098.455-.253.65-.449l4.625-4.626c.186-.186.331-.406.429-.65.098-.245.146-.506.146-.779 0-.273-.048-.534-.146-.78-.098-.245-.243-.464-.429-.65L16.667 2.742c-.103-.096-.222-.172-.355-.224-.133-.052-.274-.078-.42-.078zM12 14.458c-.37 0-.734-.146-1-.414l-3.5-3.5c-.39-.39-.39-1.023 0-1.414.39-.39 1.024-.39 1.414 0l2.793 2.793 6.793-6.793c.39-.39 1.023-.39 1.414 0 .39.39.39 1.024 0 1.414l-7.5 7.5c-.266.267-.63.413-1 .413z"></path>
              </svg>
              <span>Add to Next up</span>
            </div>
          </div>
        </div>
      );
    };

    return (
      <div>
        {mList && mList.map((m) => musicDisplay(m))}
        {playList && <Audioplayermelo playList={playList} />}
      </div>
    );
  };

  return <div>{musics && musicList(musics)}</div>;
};

export default SongList;
