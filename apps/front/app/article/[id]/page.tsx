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
        console.log("votesData : ", votesData);
        console.log("nbTotalVotes : ", nbTotalVotes);

        if (!nbTotalVotes) {
          console.log("Article has no votes");
          // Use article default emotion value on the article
        } else {
          console.log("Article has votes");
          // For each array of votesData -> count the amount of each emotion_id value

          // Get the most voted emotion

          // Use the most voted emotion id to get the name in the Emotion table
          // const seeOneEmotion() with server path : '/emotions/:id'
        }
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    getOneArticle();
    seeAllVotesOnArticle();
  }, []);

  console.log(article);

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
            <p className=""> Angoissant 80%</p>
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
