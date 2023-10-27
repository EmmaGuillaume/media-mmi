"use client";
import React from "react";
// import { toast } from "react-toastify";
import Link from "next/link";
// import fetcher from "@/libs/fetcher";
import { useAtomValue } from "jotai";
import { accessTokenAtom, userIdAtom } from "@/store";

export default function Account() {
  const accessToken = useAtomValue(accessTokenAtom);
  const userId = useAtomValue(userIdAtom);

  const seeOneProfile = async () => {
    try {
      const response = await fetch(
        `https://akoro-backend.up.railway.app/profile/read/${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      const profileData = await response.json();
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };
  // seeOneProfile();

  return (
    <main className="px-6 pt-10 font-raleway mb-36">
      <div className="flex w-full max-w-md mx-auto gap-8">
        <h1 className="text-3xl font-extrabold">Mon compte</h1>
      </div>
      <section className="w-full max-w-md mx-auto mt-10">
        {/* <h2 className="mb-6 text-2xl font-extrabold">[Mon nom]</h2> */}
        <div className="flex flex-col">
          {/* <Link className="text-white text-sm font-light mb-4" href="/settings">
            {"Paramètres de l'application"}
          </Link> */}
          <Link className="text-white text-sm font-light mb-4" href="/cgu">
            {"Conditions générales d'utilisation"}
          </Link>
        </div>
      </section>
    </main>
  );
}
