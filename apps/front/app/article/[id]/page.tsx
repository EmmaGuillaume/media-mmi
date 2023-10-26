"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { accessTokenAtom } from "@/store";
import { useRouter } from "next/navigation";
import { useAtomValue } from "jotai";
import { Article } from "@/types/global";
import { parseDateDDMMYYYY } from "@/lib/parse-date";

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
        const response = await fetch(
          `http://localhost:3001/articles/${id}`,
          {
            method: "GET",
          }
        );

        const articleData = await response.json();
        setArticle(articleData);
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    const seeAllVotesOnArticle = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/articles/vote/${id}`,
          {
            method: "GET",
          }
        );

        const votesData = await response.json();
        const nbTotalVotes = votesData.length;
        console.log('votesData : ',votesData);
        console.log('nbTotalVotes : ',nbTotalVotes);
        
        if(!nbTotalVotes) {
          console.log('Article has no votes');
          // Use article default emotion value on the article
        } else {
          console.log('Article has votes');
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
    <main className="flex flex-col justify-center px-4 bg-slate-200 font-raleway">
      <div>
        <h1 className="text-3xl font-extrabold uppercase">
          {article[0]?.title}
        </h1>
        <p> {parseDateDDMMYYYY(article[0]?.created_at)}</p>
      </div>
      <div>
        <p>{article[0]?.introduction}</p>
        <p>{article[0]?.content}</p>
      </div>

      <div className="flex flex-col gap-20"></div>
    </main>
  );
}