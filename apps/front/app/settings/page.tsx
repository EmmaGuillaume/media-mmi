"use client";
import { useRef } from "react";
import Image from "next/image";
import LeftArrowIcon from "@/public/images/icons/left-arrow.svg";
import { useRouter } from "next/navigation";

export default function HomeConnected() {
  const videoRef = useRef<any>(null);
  const router = useRouter();

  return (
    <main className="px-6 pt-10 font-raleway mb-36">
      <div className="flex items-center gap-8 w-full">
        <button
          onClick={() => {
            router.push("./home");
          }}
        >
          <Image src={LeftArrowIcon} alt="Left Arrow" />
        </button>
        <h2 className="text-center font-extrabold text-3xl">Paramètres</h2>
      </div>

      <section className="w-full mt-10">
        <h3 className="font-extrabold text-2xl mb-6">
          Informations personnelles
        </h3>
        <form className="w-full flex flex-col gap-4">
          <input
            className="bg-grey h-12 rounded-xl w-full px-4 py-2 focus:outline-blue"
            type="text"
            placeholder="Nom"
          />
          <input
            className="bg-grey h-12 rounded-xl w-full px-4 py-2 focus:outline-blue"
            type="text"
            placeholder="Email"
          />
          <input
            className="bg-grey h-12 rounded-xl w-full px-4 py-2 focus:outline-blue"
            type="password"
            placeholder="Password"
          />
        </form>
      </section>

      <section className="w-full mt-10">
        <div>
          <h3 className="font-extrabold text-2xl mb-6">
            Préférences de contenu
          </h3>
          <p className="w-full font-thin text-lg">
            Fusce et tempor risus, ut feugiat tortor. Nam gravida magna id
            viverra finibus. Donec quis lorem a orci commodo efficitur. Aenean
            vestibulum urna ut eros pharetra blandit.
          </p>
          <div className="mt-8">
            <h3 className="font-bold text-xl mb-4">Format préféré</h3>
            <form className="w-full items-start flex flex-col gap-4">
              <div className="flex gap-4 items-center">
                <input
                  className=" h-8 rounded-xl w-full px-4 py-2 focus:outline-blue"
                  type="checkbox"
                  placeholder="Nom"
                />
                <label className="font-thin text-lg">Vidéo</label>
              </div>
              <div className="flex gap-4 items-center">
                <input
                  className=" h-8 rounded-xl w-full px-4 py-2 focus:outline-blue"
                  type="checkbox"
                  placeholder="Nom"
                />
                <label className="font-thin text-lg">Audio</label>
              </div>
              <div className="flex gap-4 items-center">
                <input
                  className=" h-8 rounded-xl w-full px-4 py-2 focus:outline-blue"
                  type="checkbox"
                  placeholder="Nom"
                />
                <label className="font-thin text-lg">Text</label>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="font-bold text-xl mb-4">Catégories préférées</h3>
          <div className="w-full items-start flex flex-col gap-4">
            <button className="bg-grey h-12 rounded-xl w-full px-4 py-2 text-start active:bg-black active:outline-blue">
              Géo po
            </button>
            <button className="bg-grey h-12 rounded-xl w-full px-4 py-2 text-start active:bg-black active:outline-blue">
              Géo po
            </button>
            <button className="bg-grey h-12 rounded-xl w-full px-4 py-2 text-start active:bg-black active:outline-blue">
              Géo po
            </button>
            <button className="bg-grey h-12 rounded-xl w-full px-4 py-2 text-start active:bg-black active:outline-blue">
              Géo po
            </button>
            <button className="bg-grey h-12 rounded-xl w-full px-4 py-2 text-start active:bg-black active:outline-blue">
              Géo po
            </button>
            <button className="bg-grey h-12 rounded-xl w-full px-4 py-2 text-start active:bg-black active:outline-blue">
              Géo po
            </button>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="font-bold text-xl mb-4">
            Émotions des actualités personnalisées
          </h3>
          <div className="w-full items-start flex flex-col gap-4">
            <button className="bg-grey h-12 rounded-xl w-full px-4 py-2 text-start active:bg-black active:outline-blue">
              Triste
            </button>
            <button className="bg-grey h-12 rounded-xl w-full px-4 py-2 text-start active:bg-black active:outline-blue">
              Enervant
            </button>
            <button className="bg-grey h-12 rounded-xl w-full px-4 py-2 text-start active:bg-black active:outline-blue">
              Positif
            </button>
            <button className="bg-grey h-12 rounded-xl w-full px-4 py-2 text-start active:bg-black active:outline-blue">
              Intéressant
            </button>
          </div>
        </div>

        <div className="mt-20">
          <h3 className="font-extrabold text-2xl mb-6">Notification </h3>
          <p className="w-full font-thin text-lg">
            Fusce et tempor risus, ut feugiat tortor. Nam gravida magna id
            viverra finibus. Donec quis lorem a orci commodo efficitur. Aenean
            vestibulum urna ut eros pharetra blandit.
          </p>
          <div className="mt-8">
            <h3 className="font-bold text-xl mb-4">
              Récurrence des notifications
            </h3>
            <form className="w-full items-start flex flex-col gap-4">
              <select className="bg-grey h-12 rounded-xl w-full px-4 py-2 focus:outline-blue">
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
