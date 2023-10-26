"use client";
import Image from "next/image";
import TristeIcon from "@/public/assets/icons/triste.svg";
import EnervantIcon from "@/public/assets/icons/enervant.svg";
import PositifIcon from "@/public/assets/icons/positif.svg";
import EtonnantIcon from "@/public/assets/icons/etonnant.svg";
import AngoissantIcon from "@/public/assets/icons/angoissant.svg";
import { useRef } from "react";
import { accessTokenAtom, userIdAtom } from "@/store";
import { useAtomValue } from "jotai";

type Props = {
  isOpen: boolean;
  setIsOpen: (_: boolean) => void;
  idArticle: number;
};

export default function VoteCard({ isOpen, setIsOpen, idArticle }: Props) {
  const emotionId = useRef<number>();
  const accessToken = useAtomValue(accessTokenAtom);
  const userId = useAtomValue(userIdAtom);

  const voteEmotion = async (emotion: number) => {
    const data = {
      profile_id: userId,
      article_id: idArticle,
      emotion_id: emotion,
    };
    try {
      const response = await fetch(
        "https://akoro-backend.up.railway.app/profile/vote/upsert",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      console.log(response);
      return response;
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  if (!isOpen) return;
  return (
    <div className="absolute -bottom-16 flex gap-4 items-center bg-white w-fit rounded-full py-3 px-6 drop-shadow-md">
      {isOpen && (
        <>
          <button
            onClick={() => {
              emotionId.current = 4;
              voteEmotion(emotionId.current);
              setIsOpen(false);
            }}
          >
            <Image src={TristeIcon} alt="" className="w-7 h-7"></Image>
          </button>
          <button
            onClick={() => {
              emotionId.current = 2;
              voteEmotion(emotionId.current);
              setIsOpen(false);
            }}
          >
            <Image src={EnervantIcon} alt="" className="w-7 h-7"></Image>
          </button>
          <button
            onClick={() => {
              emotionId.current = 3;
              voteEmotion(emotionId.current);
              setIsOpen(false);
            }}
          >
            <Image src={PositifIcon} alt="" className="w-7 h-7"></Image>
          </button>
          <button
            onClick={() => {
              emotionId.current = 0;
              voteEmotion(emotionId.current);
              setIsOpen(false);
            }}
          >
            <Image src={EtonnantIcon} alt="" className="w-7 h-7"></Image>
          </button>
          <button
            onClick={() => {
              emotionId.current = 1;
              voteEmotion(emotionId.current);
              setIsOpen(false);
            }}
          >
            <Image src={AngoissantIcon} alt="" className="w-7 h-7"></Image>
          </button>
          <button onClick={() => setIsOpen(false)} className="text-black">
            Fermer
          </button>
        </>
      )}
    </div>
  );
}
