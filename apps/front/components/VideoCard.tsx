// components/VideoItem.js
import React from "react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

type Props = {
  title: string;
  id: number;
  shortVideo: string;
  longVideo: string;
};
const VideoCard = ({ title, id, shortVideo, longVideo }: Props) => {
  const videoRef = useRef<any>(null);
  const [playLongVideo, setPlayLongVideo] = useState<boolean>(false);

  useEffect(() => {}, [playLongVideo]);
  return (
    <>
      <div className="relative snap-center h-full">
        <video
          className="object-cover aspect-9/16"
          src={!playLongVideo ? shortVideo : longVideo}
          ref={videoRef}
          onClick={() => {
            videoRef.current.paused
              ? videoRef.current.play()
              : videoRef.current.pause();
          }}
        />
        <h2 className="absolute bottom-56 max-w-3/4 font-raleway text-3xl font-extrabold left-4 uppercase">
          {title}
        </h2>
        <button
          onClick={() => {
            setPlayLongVideo(!playLongVideo);
          }}
          className="absolute  gap- h-12 bottom-36 bg-red w-full text-left px-4"
        >
          Voir le format {!playLongVideo ? " long" : " court"}
        </button>
      </div>
    </>
  );
};
export default VideoCard;
