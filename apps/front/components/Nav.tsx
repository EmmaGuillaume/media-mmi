"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import HomeIcon from "@/public/assets/icons/home-icon.svg";
import ForYouIcon from "@/public/assets/icons/akoro-icon.svg";
import AccountIcon from "@/public/assets/icons/account-icon.svg";

export default function Nav() {
  const router = useRouter();
  return (
    <div className="fixed w-full bottom-0">
      <div className="flex items-center justify-between w-full h-16 px-16 text-black bg-white drop-shadow-md">
        <button className="flex flex-col gap-y-px items-center text-xs font-medium"
          onClick={() => {
            router.push("./settings");
          }}
        >
          <Image src={ForYouIcon} alt="Pour toi" />
          Pour toi
        </button>
        <button className="flex flex-col gap-y-px items-center text-xs font-medium"
          onClick={() => {
            router.push("./home");
          }}
        >
          <Image src={HomeIcon} alt="Accueil" />
          Accueil
        </button>
        <button className="flex flex-col gap-y-px items-center text-xs font-medium"
          onClick={() => {
            router.push("./account");
          }}
        >
          <Image src={AccountIcon} alt="Compte" />
          Compte
        </button>
      </div>
    </div>
  );
}
