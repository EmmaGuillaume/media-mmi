"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { accessTokenAtom } from "@/store";
import { useRouter } from "next/navigation";
import { useAtomValue } from "jotai";
import CardText from "@/components/CardText";
import { Article } from "@/types/global";
import VideoCard from "@/components/VideoCard";
import CamIcon from "@/public/assets/icons/cam-icon.svg";
import TextIcon from "@/public/assets/icons/text-icon.svg";

export default function HomeConnected() {
  const accessToken = useAtomValue(accessTokenAtom);
  const router = useRouter();
  const videoRef = useRef<any>(null);
  const [articleList, setArticleList] = useState<Article[]>([]);
  const [isTextFormat, setIsTextFormat] = useState<boolean>(true);

  const getVisibleArticle = async () => {
    try {
      const response = await fetch(
        "https://akoro-backend.up.railway.app/articles/visible",
        {
          method: "GET",
        }
      );

      setArticleList(await response.json());
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  console.log("accessToken", { accessToken });
  useEffect(() => {
    getVisibleArticle();
  }, []);

  return (
    <main className="flex flex-col justify-center bg-slate-200">
      <div className="">
        <div className="h-16 bg-black flex justify-center">
          <button
            className={
              isTextFormat
                ? "bg-white text-black rounded-bl-xl px-8 py-2 h-fit w-28"
                : " px-8 py-2 rounded-bl-xl bg-grey h-fit w-28"
            }
            onClick={() => {
              setIsTextFormat(true);
            }}
          >
            Text
          </button>
          <button
            className={
              !isTextFormat
                ? "bg-white text-black  rounded-br-xl px-8 py-2 h-fit w-28"
                : " px-8 py-2 rounded-br-xl bg-grey h-fit w-28"
            }
            onClick={() => {
              setIsTextFormat(false);
            }}
          >
            Video
          </button>
        </div>

        <div className={isTextFormat ? "flex flex-col gap-20 px-4" : "hidden"}>
          {articleList.map((article) => (
            <CardText
              key={article.id}
              title={article.title}
              id={article.id}
              introduction={article.introduction}
            />
          ))}
        </div>
        <div
          className={
            isTextFormat
              ? "hidden"
              : "snap-y snap-mandatory overflow-scroll h-screen"
          }
        >
          {articleList.map((article, index) => (
            <VideoCard
              key={index}
              longVideo={article.long_video}
              shortVideo={article.short_video}
              title={article.title}
              id={article.id}
            />
          ))}
        </div>
      </div>

      {/* <div>{greeting}</div> */}
      <div className="snap-y ">
        {/* <video
          className="snap-center w-full h-[850px]"
          ref={videoRef}
          onClick={() =>
            videoRef.current.paused
              ? videoRef.current.play()
              : videoRef.current.pause()
          }
        >
          <source
            src="/video/mais-ca-veut-dire-quoi-ces-pourcentages-de-pluie-sur-les-applis-meteo.mp4"
            type="video/mp4"
          />
          Download the
          <a href="https://www.youtube.com/watch?v=KSUF9ihIVVI">WEBM</a>
          or
          <a href="https://www.youtube.com/watch?v=KSUF9ihIVVI">MP4</a>
          video.
        </video>
        <video
          className="snap-center w-full h-[850px]"
          ref={videoRef}
          onClick={() =>
            videoRef.current.paused
              ? videoRef.current.play()
              : videoRef.current.pause()
          }
        >
          <source
            src="/video/mais-ca-veut-dire-quoi-ces-pourcentages-de-pluie-sur-les-applis-meteo.mp4"
            type="video/mp4"
          />
          Download the
          <a href="https://www.youtube.com/watch?v=KSUF9ihIVVI">WEBM</a>
          or
          <a href="https://www.youtube.com/watch?v=KSUF9ihIVVI">MP4</a>
          video.
        </video> */}
      </div>
    </main>
  );
}
