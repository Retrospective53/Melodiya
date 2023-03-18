import React, { useState } from "react";
import musicServices from "@/services/music";
import Image from "next/image";

// const B2Image = async ({ dataImage }) => {
//   const imageData = await Buffer.from(dataImage).toString("base64");
//   const blob = new Blob([imageData], { type: "image/jpeg" });
//   const url = URL.createObjectURL(blob);
//   return (
//     <div>
//       <Image src={imageData} alt="song image" width={100} height={100} />
//     </div>
//   );
// };

const SongList = () => {
  const [musics, setMusics] = useState([]);

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

    const musicDisplay = async (music) => {
      const fileImage = await musicServices.getFileInfo(music.picture);
      console.log(fileImage);

      return (
        <div className="bg-slate-600">
          <div>{music.title}</div>
          <div>{music.duration}</div>
          <div>{music.likes}</div>
          <div>{music.playCount}</div>
        </div>
      );
    };

    return <div>{mList && mList.map((m) => musicDisplay(m))}</div>;
  };

  const handleClick = async () => {
    const response = await musicServices.getMusic();
    setMusics(response);
  };

  return (
    <div>
      <button onClick={handleClick}>Get Music</button>
      <button onClick={() => console.log(musics)}>Check musics</button>
      {musics && musicList(musics)}
    </div>
  );
};

export default SongList;
