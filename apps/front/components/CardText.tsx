"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PinIcon from "@/public/assets/icons/pin-icon.svg";
import ShareIcon from "@/public/assets/icons/share-icon.svg";
import VoteCard from "@/components/EmotionsChoiceModal";
import { title } from "process";
import { useState, useRef } from "react";
import EmotionIcon from "@/public/assets/icons/emotion-icon.svg";
import { accessTokenAtom } from "@/store";
import { useAtomValue } from "jotai";
type Article = {
  id: number;
  title: string;
  introduction: string;
  emotion: string;
  percentEmotion: any;
};

export default function CardText({
  id,
  title,
  introduction,
  emotion,
  percentEmotion,
}: Article) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const accessToken = useAtomValue(accessTokenAtom);

  return (
    <div className="relative bg-no-repeat bg-cover font-raleway rounded-2xl bg-card-text-green">
      <div className="pt-8 pb-4">
        <div className="flex items-center justify-end h-6 pl-6 pr-8 rounded-r-full w-fit bg-green">
          <div className="text-black">
            Voté {emotion} à {percentEmotion} !
          </div>
        </div>
        <div className="mx-6">
          <div className="flex flex-col gap-2 mt-6 mb-12">
            <h2 className="text-2xl font-extrabold uppercase">{title}</h2>
            <p className="font-thin">{introduction}</p>
          </div>

          <div className="flex gap-4">
            <Image src={ShareIcon} alt="" />
            <Image src={PinIcon} alt="" />
            {accessToken && (
              <button>
                <Image
                  onClick={() => {
                    setIsOpen(!isOpen);
                  }}
                  src={EmotionIcon}
                  alt=""
                />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 pt-3 pl-3 bg-black rounded-tl-xl w-fit">
        <button
          onClick={() => {
            router.push(`/article/${id}`);
          }}
          className="px-6 py-2 text-black rounded-lg bg-green-light2"
        >
          Voir +
        </button>
      </div>
      <VoteCard isOpen={isOpen} setIsOpen={setIsOpen} idArticle={id} />
    </div>
  );
}
