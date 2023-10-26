// components/VideoList.js
import React from "react";
import VideoCard from "@/components/VideoCard";

const VideoList = () => {
  const videos = [
    {
      title: "ISRAËL-HAMAS : L’ACTU DE LA GUERRE",
      url: "https://drive.google.com/uc?export=download&id=1ITTUadoNYwKbKi0dU5tS_26HeUgDxMul",
    },
    {
      title: "Video 2",
      url: "/video/mais-ca-veut-dire-quoi-ces-pourcentages-de-pluie-sur-les-applis-meteo.mp4",
    },
  ];
  return (
    <div className="snap-y snap-mandatory overflow-scroll h-screen">
      {videos.map((video, index) => (
        <VideoCard key={index} video={video} />
      ))}
    </div>
  );
};

export default VideoList;
