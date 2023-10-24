"use client";
import { FormEvent, useRef } from "react";
import Image from "next/image";

import { useRouter } from "next/navigation";

export default function HomeConnected() {
  const router = useRouter();
  const longVideoRef = useRef<any>(null);
  const titleRef = useRef<any>(null);
  const introductionRef = useRef<any>(null);
  const contentRef = useRef<any>(null);
  const shortVideoRef = useRef<any>(null);
  const imageRef = useRef<any>(null);

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const data = {
      title: titleRef.current,
      introduction: introductionRef.current,
      content: contentRef.current,
      image: imageRef.current,
      shortVideo: shortVideoRef.current,
      longVideo: longVideoRef.current,
    };

    try {
      const response = await fetch("http://localhost:3001/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        router.push("/success");
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
          className="border-2 rounded-md p-2"
          onChange={(e) => {
            titleRef.current = e.target.value;
          }}
        />
        <input
          type="text"
          placeholder="introduction"
          className="border-2 rounded-md p-2"
          onChange={(e) => {
            introductionRef.current = e.target.value;
          }}
        />
        <input
          type="text"
          placeholder="content"
          className="border-2 rounded-md p-2"
          onChange={(e) => {
            contentRef.current = e.target.value;
          }}
        />
        <input
          type="text"
          placeholder="image"
          className="border-2 rounded-md p-2"
          onChange={(e) => {
            imageRef.current = e.target.value;
          }}
        />
        <input
          type="text"
          placeholder="short"
          className="border-2 rounded-md p-2"
          onChange={(e) => {
            shortVideoRef.current = e.target.value;
          }}
        />
        <input
          type="text"
          placeholder="long"
          className="border-2 rounded-md p-2"
          onChange={(e) => {
            longVideoRef.current = e.target.value;
          }}
        />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
