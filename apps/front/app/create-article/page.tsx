"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { accessTokenAtom } from "@/store";
import { useAtomValue } from "jotai";

import { useRouter } from "next/navigation";
type Article = {
  title: string;
  introduction: string;
  content: string;
  image: string;
  short_video: string;
  long_video: string;
  is_visible: boolean;
  voted_emotion: VotedEmotion[];
};
type Category = {
  id: number;
  name: string;
};
type Emotion = {
  id: number;
  name: string;
};

type VotedEmotion = {
  name: string;
  is_voted: boolean;
};
type EmotionSelection = { [key: string]: boolean };

export default function HomeConnected() {
  const router = useRouter();
  const longVideoRef = useRef<any>(null);
  const titleRef = useRef<any>(null);
  const introductionRef = useRef<any>(null);
  const contentRef = useRef<any>(null);
  const shortVideoRef = useRef<any>(null);
  const imageRef = useRef<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [emotionsList, setEmotionsList] = useState<Emotion[]>([]);
  const [selectedEmotions, setSelectedEmotions] = useState<VotedEmotion[]>([]);

  const accessToken = useAtomValue(accessTokenAtom);
  console.log(
    "🚀 ~ file: page.tsx:30 ~ HomeConnected ~ accessToken:",
    accessToken
  );
  const updateEmotionSelection = (emotion: string) => {
    const updatedEmotions: VotedEmotion[] = emotionsList.map((e) => ({
      name: e.name,
      is_voted: e.name === emotion,
    }));
    setSelectedEmotions(updatedEmotions);
  };

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const data: Article = {
      title: titleRef.current,
      introduction: introductionRef.current,
      content: contentRef.current,
      image: imageRef.current,
      short_video: shortVideoRef.current,
      long_video: longVideoRef.current,
      is_visible: isVisible,
      voted_emotion: selectedEmotions,
    };

    try {
      const response = await fetch(
        "https://akoro-backend.up.railway.app/articles/create",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      console.log(JSON.stringify(data));

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
      } else {
        console.error(
          "Error submitting form:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const getCategories = async () => {
    try {
      const response = await fetch(
        "https://akoro-backend.up.railway.app/categories/all",
        {
          method: "GET",
        }
      );

      setCategoryList(await response.json());
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const getEmotion = async () => {
    try {
      const response = await fetch(
        "https://akoro-backend.up.railway.app/emotions/all",
        {
          method: "GET",
        }
      );

      setEmotionsList(await response.json());
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  console.log({ selectedEmotions });
  useEffect(() => {
    getCategories();
    getEmotion();
  }, []);
  return (
    <main className="px-4 py-12 font-raleway">
      <form
        className="flex flex-col w-full gap-4"
        onSubmit={(event) => {
          handleFormSubmit(event);
        }}
      >
        <h2 className="text-3xl font-extrabold"> {"Création d'article"}</h2>
        <div className="flex gap-2">
          <input
            type="checkbox"
            checked={isVisible}
            onChange={() => {
              setIsVisible(!isVisible);
            }}
          />
          <label htmlFor="">Article {isVisible ? "affiché" : "masqué"}</label>
        </div>
        <input
          type="text"
          placeholder="Titre"
          className="w-full h-12 px-4 py-2 bg-grey rounded-xl focus:outline-blue"
          onChange={(e) => {
            titleRef.current = e.target.value;
            console.log(titleRef.current);
          }}
        />
        <textarea
          className="w-full px-4 py-2 h-36 bg-grey rounded-xl focus:outline-blue"
          placeholder="Introduction"
          onChange={(e) => {
            introductionRef.current = e.target.value;
          }}
        />
        <textarea
          className="w-full h-56 px-4 py-2 bg-grey rounded-xl focus:outline-blue"
          placeholder="Contenu"
          onChange={(e) => {
            contentRef.current = e.target.value;
          }}
        />
        <input
          type="text"
          placeholder="Url de l'image"
          className="w-full h-12 px-4 py-2 bg-grey rounded-xl focus:outline-blue"
          onChange={(e) => {
            imageRef.current = e.target.value;
          }}
        />
        <input
          type="text"
          placeholder="Url de la vidéo courte"
          className="w-full h-12 px-4 py-2 bg-grey rounded-xl focus:outline-blue"
          onChange={(e) => {
            shortVideoRef.current = e.target.value;
          }}
        />
        <input
          type="text"
          placeholder="Url de la vidéo longue"
          className="w-full h-12 px-4 py-2 bg-grey rounded-xl focus:outline-blue"
          onChange={(e) => {
            longVideoRef.current = e.target.value;
          }}
        />
        <div className="flex flex-col gap-2">
          <p>À quelle émotion correspond cet article ?</p>
          <select
            className="w-full h-12 px-4 py-2 bg-grey rounded-xl focus:outline-blue"
            onChange={(e) => updateEmotionSelection(e.target.value)}
          >
            {emotionsList.map((emotion) => (
              <option key={emotion.id} value={emotion.name}>
                {emotion.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <p>À quel thème correspond cet article ?</p>
          <div>
            {categoryList.map((categoryList) => (
              <div key={categoryList.id} className="flex gap-2">
                <input type="checkbox" />
                <label htmlFor="">{categoryList.name}</label>
              </div>
            ))}
          </div>
        </div>

        <button
          className="w-full h-12 mt-6 rounded-full bg-purple-dark1"
          type="submit"
        >
          Submit
        </button>
      </form>
    </main>
  );
}
