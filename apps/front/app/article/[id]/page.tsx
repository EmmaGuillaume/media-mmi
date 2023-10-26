"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { accessTokenAtom } from "@/store";
import { useRouter } from "next/navigation";
import { useAtomValue } from "jotai";
import { Article } from "@/types/global";
import { parseDateDDMMYYYY } from "@/lib/parse-date";
import ShareIcon from "@/public/assets/icons/share-icon.svg";
import ArrowIcon from "@/public/assets/icons/arrow.svg";

export default function Article() {
  const router = useRouter();
  const accessToken = useAtomValue(accessTokenAtom);
  const [article, setArticle] = useState<Article[]>([]);
  const [percentArray, setPercentArray] = useState<number[]>([]);

  const emotionCounts = {
    surpisingId: 0,
    angoissantId: 0,
    angryId: 0,
    positifId: 0,
    sadId: 0,
  };
  const Emotion = ["Étonnant", "Angoissant", "Énervant", "Positif", "Triste"];

  useEffect(() => {
    const url = window.location.href;
    const urlParts = url.split("/");
    const id = urlParts[urlParts.length - 1];

    const getOneArticle = async () => {
      try {
        const response = await fetch(`http://localhost:3001/articles/${id}`, {
          method: "GET",
        });

        const articleData = await response.json();
        setArticle(articleData);
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    const seeAllVotesOnArticle = async () => {
      try {
        const response = await fetch(
          `https://akoro-backend.up.railway.app/articles/vote/${id}`,
          {
            method: "GET",
          }
        );

        const votesData = await response.json();
        const nbTotalVotes = votesData.length;

        if (!nbTotalVotes) {
          console.log("Article has no votes");
        } else {
          votesData.forEach((vote: any) => {
            console.log("AAA", vote.emotion_id);

            console.log("vote : ", vote.emotion_id);
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
        PercentOfVotes();
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    const PercentOfVotes = () => {
      const totalVotes = Object.values(emotionCounts).reduce(
        (a: number, b: number) => a + b,
        0
      );
      const percentOfVotes = Object.values(emotionCounts).map(
        (emotionCount: number) => {
          return Math.round((emotionCount / totalVotes) * 100);
        }
      );
      console.log(percentOfVotes);
      setPercentArray(percentOfVotes);
      console.log({ percentArray });

      return percentOfVotes;
    };

    getOneArticle();
    seeAllVotesOnArticle();
  }, []);

  function getMaxEmotion() {
    const maxPercent = Math.max(...percentArray);
    const maxEmotionIndex = percentArray.indexOf(maxPercent);
    return Emotion[maxEmotionIndex];
  }

  function getMaxEmotionPercent() {
    const maxPercent = Math.max(...percentArray);
    return `${maxPercent}%`;
  }

  return (
    <main className="flex flex-col justify-center  bg-slate-200 font-raleway">
      <div
        className={
          article[0]?.image
            ? "relative h-56 overflow-hidden"
            : "relative h-32 overflow-hidden bg-purple-dark1"
        }
      >
        {article[0]?.image && (
          <>
            <div className="absolute z-10 w-full h-full bg-black bg-opacity-30"></div>
            <img src={article[0]?.image} alt="" className="w-full z-0"></img>
          </>
        )}
        <h1 className="z-20 ml-4 absolute bottom-4 text-3xl font-extrabold uppercase">
          {article[0]?.title}
        </h1>
        <button
          onClick={() => {
            router.push("../");
          }}
          className="absolute top-8 left-6 z-30 "
        >
          <Image src={ArrowIcon} alt=""></Image>
        </button>
      </div>
      <section className="bg-purple-dark1 px-6 h-20 flex items-center gap-8">
        <div className="flex gap-2">
          <Image src={ShareIcon} alt=""></Image>
          <div>
            <p className=""> Vote des lecteurs :</p>
            <p className="">
              {percentArray.length > 0 && getMaxEmotion()}
              {percentArray.length > 0 && getMaxEmotionPercent()}
            </p>{" "}
          </div>
        </div>
        <div className=" flex gap-2">
          <Image src={ShareIcon} alt=""></Image>
          <div>
            <p> Publié le : </p>
            <p>{parseDateDDMMYYYY(article[0]?.created_at)}</p>
          </div>
        </div>
      </section>
      <section className="px-6 mt-10">
        <p>{article[0]?.introduction}</p>
        <p className="mt-8">{article[0]?.content}</p>
      </section>
    </main>
  );
}
