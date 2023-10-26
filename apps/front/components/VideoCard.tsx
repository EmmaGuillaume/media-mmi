// components/VideoItem.js
import React from "react";
import Image from "next/image";

type Props = {
  video: {
    title: string;
    url: string;
  };
};
const VideoCard = ({ video }: Props) => {
  const videoRef = React.useRef<any>(null);
  return (
    <>
      <div className="relative snap-center h-full">
        <video
          className="object-cover aspect-9/16"
          src={video.url}
          ref={videoRef}
          onClick={() => {
            videoRef.current.paused
              ? videoRef.current.play()
              : videoRef.current.pause();
          }}
        />
        <h2 className="absolute bottom-56 max-w-3/4 font-raleway text-3xl font-extrabold left-4 uppercase">
          {video.title}
        </h2>
        <button className="absolute  gap- h-12 bottom-36 bg-red w-full text-left px-4">
          Voir le format long
        </button>
      </div>
    </>
  );
};
export default VideoCard;
