"use client";
import { FormEvent, useRef } from "react";
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
};

export default function HomeConnected() {
  const router = useRouter();
  const longVideoRef = useRef<any>(null);
  const titleRef = useRef<any>(null);
  const introductionRef = useRef<any>(null);
  const contentRef = useRef<any>(null);
  const shortVideoRef = useRef<any>(null);
  const imageRef = useRef<any>(null);

  const accessToken = useAtomValue(accessTokenAtom);
  console.log(
    "🚀 ~ file: page.tsx:30 ~ HomeConnected ~ accessToken:",
    accessToken
  );

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const data: Article = {
      title: titleRef.current,
      introduction: introductionRef.current,
      content: contentRef.current,
      image: imageRef.current,
      short_video: shortVideoRef.current,
      long_video: longVideoRef.current,
    };

    try {
      const response = await fetch(
        "https://akoro-backend.up.railway.app/create-article",
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

  return (
    <main className="px-4 py-12">
      <form
        className="flex flex-col w-full gap-2"
        onSubmit={(event) => {
          handleFormSubmit(event);
        }}
      >
        Create an article
        <input
          type="text"
          placeholder="title"
          className="p-2 border-2 rounded-md"
          onChange={(e) => {
            titleRef.current = e.target.value;
            console.log(titleRef.current);
          }}
        />
        <input
          type="text"
          placeholder="introduction"
          className="p-2 border-2 rounded-md"
          onChange={(e) => {
            introductionRef.current = e.target.value;
          }}
        />
        <input
          type="text"
          placeholder="content"
          className="p-2 border-2 rounded-md"
          onChange={(e) => {
            contentRef.current = e.target.value;
          }}
        />
        <input
          type="text"
          placeholder="image"
          className="p-2 border-2 rounded-md"
          onChange={(e) => {
            imageRef.current = e.target.value;
          }}
        />
        <input
          type="text"
          placeholder="short"
          className="p-2 border-2 rounded-md"
          onChange={(e) => {
            shortVideoRef.current = e.target.value;
          }}
        />
        <input
          type="text"
          placeholder="long"
          className="p-2 border-2 rounded-md"
          onChange={(e) => {
            longVideoRef.current = e.target.value;
          }}
        />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
