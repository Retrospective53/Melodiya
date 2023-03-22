import React from "react";
import { useState, lazy, Suspense } from "react";

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

  const AudioPlayer = lazy(() => import("react-modern-audio-player"));

  return (
    <div>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <AudioPlayer
            playList={playList}
            activeUI={progress}
            placement={{ player: "bottom" }}
            autoPlay={true}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default Audioplayermelo;
