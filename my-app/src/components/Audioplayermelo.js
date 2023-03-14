import React from "react";
import { useEffect, useState } from "react";
import AudioPlayer from "react-modern-audio-player";
import musicServices from "../services/music";

const Audioplayermelo = () => {
  const playList = [
    {
      name: "patchoulo",
      writer: "neet",
      img: "",
      src: "http://localhost:3003/yana.flac",
      id: 1,
    },
  ];
  const [music, setMusic] = useState(playList);
  const [placement, setPlacement] = useState("static");

  const progress = {
    playButton: true,
    playList: "sortable",
    prevNnext: true,
    volume: true,
    volumeSlider: true,
    repeatType: true,
    trackTime: true,
    trackInfo: true,
    artwork: true,
    progress: "bar",
  };
  return (
    <div>
      <div>
        <AudioPlayer
          playList={music}
          activeUI={progress}
          placement={{ player: placement }}
          autoPlay={true}
        />
      </div>
      {/* <button
        onClick={() => {
          setPlacement("bottom-left");
        }}
      >
        bottom
      </button>
      <button
        onClick={() => {
          setPlacement("bottom-right");
        }}
      >
        top
      </button>
      <div>
        <button
          onClick={() => {
            setMusic([
              ...music,
              {
                name: "patchoulowe",
                writer: "neet",
                img: "",
                src: "http://localhost:3003/library.mp3",
                id: 3,
              },
            ]);
          }}
        >
          asdas
        </button>
        <button
          onClick={() => {
            setMusic("http://localhost:3003/euforia.mp3");
          }}
        >
          change
        </button>
      </div> */}
    </div>
  );
};

export default Audioplayermelo;
