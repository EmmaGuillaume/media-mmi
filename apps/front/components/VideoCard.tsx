// components/VideoItem.js
import React from "react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import SadIcon from "@/public/assets/icons/sad-black.svg";
import PositifIcon from "@/public/assets/icons/positif-black.svg";
import EnervantIcon from "@/public/assets/icons/angry-black.svg";
import EtonnantIcon from "@/public/assets/icons/etonnant-black.svg";
import AngoissantIcon from "@/public/assets/icons/angoissant-black.svg";

type Props = {
  title: string;
  id: number;
  shortVideo: string;
  longVideo: string;
  emotion: string;
  percentEmotion: any;
};
const VideoCard = ({
  title,
  id,
  shortVideo,
  longVideo,
  emotion,
  percentEmotion,
}: Props) => {
  const videoRef = useRef<any>(null);
  const [playLongVideo, setPlayLongVideo] = useState<boolean>(false);

  let coloredEmotion = "";
  let lightColoredEmotion = "";
  let iconEmotion = "";

  if (emotion === "Positif") {
    coloredEmotion = "bg-green";
    lightColoredEmotion = "bg-green-light2";
    iconEmotion = PositifIcon;
  } else if (emotion === "Triste") {
    coloredEmotion = "bg-blue";
    lightColoredEmotion = "bg-blue-light2";
    iconEmotion = SadIcon;
  } else if (emotion === "Énervant") {
    coloredEmotion = "bg-red";
    lightColoredEmotion = "bg-red-light2";
    iconEmotion = EnervantIcon;
  } else if (emotion === "Étonnant") {
    coloredEmotion = "bg-yellow";
    lightColoredEmotion = "bg-yellow-light2";
    iconEmotion = EtonnantIcon;
  } else if (emotion === "Angoissant") {
    coloredEmotion = "bg-purple";
    lightColoredEmotion = "bg-purple-light2";
    iconEmotion = AngoissantIcon;
  }

  useEffect(() => {}, [playLongVideo]);
  return (
    <>
      <div className="relative snap-center h-full font-raleway">
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
        <div
          className={` absolute bottom-52 flex items-center justify-end h-8 pl-6 pr-8 rounded-r-full w-fit ${coloredEmotion}`}
        >
          <div className="text-black flex items-center gap-2">
            Voté {emotion} à {percentEmotion} !
            <Image src={iconEmotion} alt="" className="w-5 h-5" />
          </div>
        </div>
        <h2 className="absolute bottom-64 max-w-3/4 font-raleway text-3xl font-extrabold left-4 uppercase">
          {title}
        </h2>
        <button
          onClick={() => {
            setPlayLongVideo(!playLongVideo);
          }}
          className={`absolute  gap- h-12 bottom-36 ${lightColoredEmotion} text-black w-full text-left px-4`}
        >
          Voir le format {!playLongVideo ? " long" : " court"}
        </button>
      </div>
    </>
  );
};
export default VideoCard;
