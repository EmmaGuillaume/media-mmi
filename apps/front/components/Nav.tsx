"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
// import HomeIcon from "@/public/images/icons/home.svg";
// import SettingsIcon from "@/public/images/icons/settings.svg";
// import AccountIcon from "@/public/images/icons/account.svg";

export default function Nav() {
  const router = useRouter();
  return (
    <div className="fixed w-full px-4 bottom-8">
      <div className="flex items-center justify-between w-full h-16 px-16 text-black bg-white rounded-xl drop-shadow-md">
        <button
          onClick={() => {
            router.push("./settings");
          }}
        >
          {/* <Image src={SettingsIcon} alt="Settings" /> */}
        </button>
        <button
          onClick={() => {
            router.push("./home");
          }}
        >
          {/* <Image src={HomeIcon} alt="Home" /> */}
        </button>
        <button
          onClick={() => {
            router.push("./account");
          }}
        >
          {/* <Image src={AccountIcon} alt="Account" /> */}
        </button>
      </div>
    </div>
  );
}