import { useEffect, useState } from "react";
import AudioPlayer from "react-modern-audio-player";
import musicServices from "../services/music";

const Main = () => {
  const playList = [
    {
      name: "patchoulo",
      writer: "neet",
      img: "",
      src: "http://localhost:3003/library.mp3",
      id: 1,
    },
    {
      name: "name",
      writer: "writer",
      img: "",
      src: "http://localhost:3003/euforia.mp3",
      id: 2,
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
    progress: "waveform",
  };
  return (
    <div className="w-full h-screen pt-[80px]">
      <div>lololol</div>
      <AudioPlayer
        playList={music}
        activeUI={progress}
        placement={{ player: placement }}
        autoPlay={true}
      />
      <button
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
      </div>
    </div>
  );
};

export default Main;
