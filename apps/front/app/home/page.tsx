"use client";
import { useRef } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { accessTokenAtom } from "@/store";
import { useRouter } from "next/navigation";
import { useAtomValue } from "jotai";
import CardText from "@/components/CardText";

export default function HomeConnected() {
  const accessToken = useAtomValue(accessTokenAtom);
  const router = useRouter();
  const videoRef = useRef<any>(null);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      router.replace("/auth");
    } catch (error) {
      console.error("error : ", error);
    }
  };
  const getAllArticle = async () => {};

  console.log("accessToken", { accessToken });

  return (
    <main className="flex flex-col justify-center px-4 bg-slate-200">
      <div className="text-purple bg-blue-light1 font-raleway">
        Connected, welcome !
      </div>
      <button onClick={handleSignOut} className="bg-red">
        Sign out
      </button>
      <div className="flex flex-col gap-16">
        <CardText
          title="Noopy chez les schtroumpfs"
          id={2}
          introduction="Noopy se balade dans le pay des mouettes et tombe sur Gargamel qui le ramène dans son monde, là bas, il vivra des centaines d'aventeures avec ses amis les schtroumpfs."
        />
      </div>

      {/* <div>{greeting}</div> */}
      <div className="snap-y ">
        {/* <video
          className="snap-center w-full h-[850px]"
          ref={videoRef}
          onClick={() =>
            videoRef.current.paused
              ? videoRef.current.play()
              : videoRef.current.pause()
          }
        >
          <source
            src="/video/mais-ca-veut-dire-quoi-ces-pourcentages-de-pluie-sur-les-applis-meteo.mp4"
            type="video/mp4"
          />
          Download the
          <a href="https://www.youtube.com/watch?v=KSUF9ihIVVI">WEBM</a>
          or
          <a href="https://www.youtube.com/watch?v=KSUF9ihIVVI">MP4</a>
          video.
        </video>
        <video
          className="snap-center w-full h-[850px]"
          ref={videoRef}
          onClick={() =>
            videoRef.current.paused
              ? videoRef.current.play()
              : videoRef.current.pause()
          }
        >
          <source
            src="/video/mais-ca-veut-dire-quoi-ces-pourcentages-de-pluie-sur-les-applis-meteo.mp4"
            type="video/mp4"
          />
          Download the
          <a href="https://www.youtube.com/watch?v=KSUF9ihIVVI">WEBM</a>
          or
          <a href="https://www.youtube.com/watch?v=KSUF9ihIVVI">MP4</a>
          video.
        </video> */}
      </div>
    </main>
  );
}
