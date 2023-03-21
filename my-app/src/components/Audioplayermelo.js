import React from "react";
import { useState } from "react";
import AudioPlayer from "react-modern-audio-player";

const Audioplayermelo = ({ playList }) => {
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
          playList={playList}
          activeUI={progress}
          placement={{ player: "bottom" }}
          autoPlay={true}
        />
      </div>
    </div>
  );
};

export default Audioplayermelo;
