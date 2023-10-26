"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { accessTokenAtom } from "@/store";
import { useRouter } from "next/navigation";
import { useAtomValue } from "jotai";
import CardText from "@/components/CardText";
import { Article } from "@/types/global";

export default function HomeConnected() {
  const accessToken = useAtomValue(accessTokenAtom);
  const router = useRouter();
  const videoRef = useRef<any>(null);
  const [articleList, setArticleList] = useState<Article[]>([]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      router.replace("/auth");
    } catch (error) {
      console.error("error : ", error);
    }
  };

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
    <main className="flex flex-col justify-center px-4 bg-slate-200">
      <button onClick={handleSignOut}>Sign out</button>
      <div className="flex flex-col gap-24">
        {articleList.map((article) => (
          <CardText
            key={article.id}
            title={article.title}
            id={article.id}
            introduction={article.introduction}
          />
        ))}
      </div>
    </main>
  );
}
