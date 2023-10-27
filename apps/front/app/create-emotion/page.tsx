"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { accessTokenAtom } from "@/store";
import { useAtomValue } from "jotai";

import { useRouter } from "next/navigation";

type Emotion = {
  name: string;
};

// type EmotionSelection = { [key: string]: boolean };

export default function HomeConnected() {
  const nameRef = useRef<any>(null);

  const accessToken = useAtomValue(accessTokenAtom);

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const data: Emotion = {
      name: nameRef.current,
    };

    try {
      const response = await fetch(
        "https://akoro-backend.up.railway.app/emotions/create",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
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
    <main className="px-4 py-12 font-raleway">
      <form
        className="flex flex-col w-full gap-4"
        onSubmit={(event) => {
          handleFormSubmit(event);
        }}
      >
        <h2 className="text-3xl font-extrabold"> {"Ajouter une émotion"}</h2>
        <input
          type="text"
          placeholder="Nom"
          className="w-full h-12 px-4 py-2 bg-grey rounded-xl focus:outline-blue"
          onChange={(e) => {
            nameRef.current = e.target.value;
          }}
        />
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
