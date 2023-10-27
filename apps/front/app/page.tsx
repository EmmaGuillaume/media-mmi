"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { accessTokenAtom, userIdAtom } from "@/store";
import { useRouter } from "next/navigation";
import { useAtomValue } from "jotai";
import CardText from "@/components/CardText";
import { Article } from "@/types/global";
import VideoCard from "@/components/VideoCard";
import CamIcon from "@/public/assets/icons/cam-icon.svg";
import TextIcon from "@/public/assets/icons/text-icon.svg";

import SadIcon from "@/public/assets/icons/sad-white.svg";
import PositifIcon from "@/public/assets/icons/positif-white.svg";
import EnervantIcon from "@/public/assets/icons/angry-white.svg";
import EtonnantIcon from "@/public/assets/icons/etonnant-white.svg";
import AngoissantIcon from "@/public/assets/icons/angoissant-white.svg";

interface ArticleEmotionData {
  [key: number]: {
    emotion: string;
    percentEmotion: string;
    correspondingEmotion: string;
    maxPercentage: any;
  };
}

interface NewEmotionData {
  articleId: number;
  maxPercentage: number;
  correspondingEmotion: string;
}

interface EmotionData {
  emotion: string;
  percentEmotion: string;
  correspondingEmotion: string;
  maxPercentage: any;
}

export default function HomeConnected() {
  const accessToken = useAtomValue(accessTokenAtom);
  const router = useRouter();
  const videoRef = useRef<any>(null);
  const [articleList, setArticleList] = useState<Article[]>([]);
  const [isTextFormat, setIsTextFormat] = useState<boolean>(true);
  const userId = useAtomValue(userIdAtom);
  const [percentArray, setPercentArray] = useState<number[]>([]);
  const [articleEmotionData, setArticleEmotionData] =
    useState<ArticleEmotionData>({});

  const getVisibleArticle = async () => {
    try {
      const response = await fetch(
        "https://akoro-backend.up.railway.app/articles/visible",
        {
          method: "GET",
        }
      );
      const articles = await response.json();
      setArticleList(articles);
      articles.forEach((article: Article) => {
        console.log("articles ID", article.id);

        seeAllVotesOnArticle(article.id);
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  console.log("accessToken", { accessToken });
  console.log("userId", { userId });

  const Emotion = ["Étonnant", "Angoissant", "Énervant", "Positif", "Triste"];
  const seeAllVotesOnArticle = async (articleId: number) => {
    try {
      const response = await fetch(
        `http://localhost:3001/articles/vote/${articleId}`,
        {
          method: "GET",
        }
      );

      const votesData = await response.json();
      console.log("votesData", votesData);

      const emotionCounts = {
        surpisingId: 0,
        angoissantId: 0,
        angryId: 0,
        positifId: 0,
        sadId: 0,
      };

      const nbTotalVotes = votesData.length;
      console.log("nbTotalVotes", nbTotalVotes);

      if (!nbTotalVotes) {
        console.log("Article has no votes");
        return;
      } else {
        votesData.forEach((vote: any) => {
          if (vote.emotion_id === 3) {
            emotionCounts.positifId++;
          }
          if (vote.emotion_id === 4) {
            emotionCounts.sadId++;
          }
          if (vote.emotion_id === 2) {
            emotionCounts.angryId++;
          }
          if (vote.emotion_id === 0) {
            emotionCounts.surpisingId++;
          }
          if (vote.emotion_id === 1) {
            emotionCounts.angoissantId++;
          }
        });
      }

      const totalVotes = Object.values(emotionCounts).reduce(
        (a: number, b: number) => a + b,
        0
      );

      const percentOfVotes = Object.values(emotionCounts).map(
        (emotionCount: number) => {
          return Math.round((emotionCount / totalVotes) * 100);
        }
      );
      console.log("percentOfVotes", percentOfVotes);

      const maxPercentage = Math.max(...percentOfVotes);
      const maxPercentageIndex = percentOfVotes.indexOf(maxPercentage);

      const emotions = [
        "surpisingId",
        "angoissantId",
        "angryId",
        "positifId",
        "sadId",
      ];
      const correspondingEmotion = emotions[maxPercentageIndex];

      const newEmotionData: EmotionData = {
        emotion: correspondingEmotion,
        percentEmotion: maxPercentage + "%",
        correspondingEmotion: Emotion[maxPercentageIndex],
        maxPercentage: maxPercentage,
      };

      setArticleEmotionData((prevData) => ({
        ...prevData,
        [articleId]: {
          emotion: newEmotionData.emotion,
          percentEmotion: newEmotionData.percentEmotion,
          correspondingEmotion: newEmotionData.correspondingEmotion,
          maxPercentage: newEmotionData.maxPercentage,
        },
      }));

      console.log(
        "Pourcentage le plus élevé des votes : ",
        articleId,
        maxPercentage + "%" + " pour l'émotion : ",
        correspondingEmotion
      );
    } catch (error) {
      console.error("Error fetching article:", error);
    }
  };

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
              emotion={articleEmotionData[article.id]?.correspondingEmotion}
              percentEmotion={
                articleEmotionData[article.id]?.maxPercentage + "%"
              }
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
    </main>
  );
}
