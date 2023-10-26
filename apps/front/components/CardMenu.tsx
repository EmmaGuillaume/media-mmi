"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PinIcon from "@/public/assets/icons/pin-icon.svg";
import ShareIcon from "@/public/assets/icons/share-icon.svg";
import EmotionIcon from "@/public/assets/icons/emotion-icon.svg";
import { title } from "process";

export default function CardMenu() {
    const router = useRouter();
    return (
        <div className="flex gap-4 items-center w-full text-white drop-shadow-md">
            <button className="flex flex-col gap-y-px items-center text-xs font-medium"
                onClick={() => {
                }}
            >
                <Image className="object-contain w-5 h-5" src={EmotionIcon} alt="Voter" />
            </button>
            <button className="flex flex-col gap-y-px items-center text-xs font-medium"
                onClick={() => {
                    router.push("./home");
                }}
            >
                <Image className="object-contain w-5 h-5" src={PinIcon} alt="Enregistrer" />
            </button>
            <button className="flex flex-col gap-y-px items-center text-xs font-medium"
                onClick={() => {
                    router.push("./account");
                }}
            >
                <Image className="object-contain w-5 h-5" src={ShareIcon} alt="Partager" />
            </button>
        </div>
    );
}
