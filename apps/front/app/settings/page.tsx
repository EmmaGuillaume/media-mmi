"use client";
import { useRef } from "react";
import Image from "next/image";
// import LeftArrowIcon from "@/public/images/icons/left-arrow.svg";
import { useRouter } from "next/navigation";

export default function HomeConnected() {
  const videoRef = useRef<any>(null);
  const router = useRouter();

  return (
    <main className="px-6 pt-10 font-raleway mb-36">
      <div className="flex items-center justify-center w-full gap-8">
        <button
          onClick={() => {
            router.push("./home");
          }}
        >
          {/* <Image src={LeftArrowIcon} alt="Left Arrow" /> */}
        </button>
        <h1 className="text-3xl font-extrabold text-center">Paramètres</h1>
      </div>

      <section className="w-full mt-10">
        <h2 className="mb-6 text-2xl font-extrabold">
          Informations personnelles
        </h2>
        <form className="flex flex-col w-full gap-4">
          <input
            className="w-full h-12 px-4 py-2 bg-grey rounded-xl focus:outline-blue"
            type="text"
            placeholder="Nom"
          />
          <input
            className="w-full h-12 px-4 py-2 bg-grey rounded-xl focus:outline-blue"
            type="text"
            placeholder="Email"
          />
          <input
            className="w-full h-12 px-4 py-2 bg-grey rounded-xl focus:outline-blue"
            type="password"
            placeholder="Password"
          />
        </form>
      </section>

      <section className="w-full mt-10">
        <div>
          <h2 className="mb-6 text-2xl font-extrabold">
            Préférences de contenu
          </h2>
          <p className="w-full text-lg font-thin">
            Fusce et tempor risus, ut feugiat tortor. Nam gravida magna id
            viverra finibus. Donec quis lorem a orci commodo efficitur. Aenean
            vestibulum urna ut eros pharetra blandit.
          </p>
          <div className="mt-8">
            <h2 className="mb-4 text-xl font-bold">Format préféré</h2>
            <form className="flex flex-col items-start w-full gap-4">
              <div className="flex items-center gap-4">
                <input
                  className="w-full h-8 px-4 py-2 rounded-xl focus:outline-blue"
                  type="checkbox"
                  placeholder="Nom"
                />
                <label className="text-lg font-thin">Vidéo</label>
              </div>
              <div className="flex items-center gap-4">
                <input
                  className="w-full h-8 px-4 py-2 rounded-xl focus:outline-blue"
                  type="checkbox"
                  placeholder="Nom"
                />
                <label className="text-lg font-thin">Audio</label>
              </div>
              <div className="flex items-center gap-4">
                <input
                  className="w-full h-8 px-4 py-2 rounded-xl focus:outline-blue"
                  type="checkbox"
                  placeholder="Nom"
                />
                <label className="text-lg font-thin">Text</label>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="mb-4 text-xl font-bold">Catégories préférées</h2>
          <div className="flex flex-col items-start w-full gap-4">
            <button className="w-full h-12 px-4 py-2 bg-grey rounded-xl text-start active:bg-black active:outline-blue">
              Géo po
            </button>
            <button className="w-full h-12 px-4 py-2 bg-grey rounded-xl text-start active:bg-black active:outline-blue">
              Géo po
            </button>
            <button className="w-full h-12 px-4 py-2 bg-grey rounded-xl text-start active:bg-black active:outline-blue">
              Géo po
            </button>
            <button className="w-full h-12 px-4 py-2 bg-grey rounded-xl text-start active:bg-black active:outline-blue">
              Géo po
            </button>
            <button className="w-full h-12 px-4 py-2 bg-grey rounded-xl text-start active:bg-black active:outline-blue">
              Géo po
            </button>
            <button className="w-full h-12 px-4 py-2 bg-grey rounded-xl text-start active:bg-black active:outline-blue">
              Géo po
            </button>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="mb-4 text-xl font-bold">
            Émotions des actualités personnalisées
          </h2>
          <div className="flex flex-col items-start w-full gap-4">
            <button className="w-full h-12 px-4 py-2 bg-grey rounded-xl text-start active:bg-black active:outline-blue">
              Triste
            </button>
            <button className="w-full h-12 px-4 py-2 bg-grey rounded-xl text-start active:bg-black active:outline-blue">
              Enervant
            </button>
            <button className="w-full h-12 px-4 py-2 bg-grey rounded-xl text-start active:bg-black active:outline-blue">
              Positif
            </button>
            <button className="w-full h-12 px-4 py-2 bg-grey rounded-xl text-start active:bg-black active:outline-blue">
              Intéressant
            </button>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="mb-6 text-2xl font-extrabold">Notification </h2>
          <p className="w-full text-lg font-thin">
            Fusce et tempor risus, ut feugiat tortor. Nam gravida magna id
            viverra finibus. Donec quis lorem a orci commodo efficitur. Aenean
            vestibulum urna ut eros pharetra blandit.
          </p>
          <div className="mt-8">
            <h2 className="mb-4 text-xl font-bold">
              Récurrence des notifications
            </h2>
            <form className="flex flex-col items-start w-full gap-4">
              <select className="w-full h-12 px-4 py-2 bg-grey rounded-xl focus:outline-blue">
                <option value="">--Please choose an option--</option>
                <option value="daily">1 fois par jour</option>
                <option value="weekly">1 fois par semaine</option>
                <option value="monthly">1 fois par mois</option>
                <option value="never">Jamais</option>
              </select>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
