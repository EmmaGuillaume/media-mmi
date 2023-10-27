"use client";
import { useRef } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

// import LeftArrowIcon from "@/public/images/icons/left-arrow.svg";
import { useForm } from "react-hook-form";
import { useAtomValue } from "jotai";
import { accessTokenAtom, userIdAtom } from "@/store";

interface IFormInput {
  id: string;
  name: string;
  format: string;
}

export default function Settings() {
  const accessToken = useAtomValue(accessTokenAtom);
  const userId = useAtomValue(userIdAtom);
  const nameRef = useRef<any>(null);
  const formatRef = useRef<any>("video");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit = async () => {
    const data: IFormInput = {
      id: userId,
      name: nameRef.current,
      format: formatRef.current,
    };
    try {
      const response = await fetch(
        "https://akoro-backend.up.railway.app/profile/upsert",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      toast.success("Informations enregistrées");
      router.push("../");

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
    <main className="px-6 pt-10 font-raleway mb-36">
      <div className="flex items-center justify-center w-full gap-8">
        <h1 className="text-3xl font-extrabold text-center">Créer un compte</h1>
      </div>

      <section className="w-full mt-10">
        <h2 className="mb-6 text-2xl font-extrabold text-center">
          Personnalisation du compte
        </h2>
        <form
          className="flex flex-col w-full max-w-md mx-auto gap-4"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="relative">
            <input
              type="text"
              id="name"
              className={`block rounded-2xl px-4 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-grey border-2 border-grey focus-rainbow dark:bg-gray-700 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                errors.name ? "bg-red-dark2" : "bg-grey"
              }`}
              placeholder=" "
              {...register("name", {
                required: "Le nom est obligatoire",
              })}
              onChange={(e) => {
                nameRef.current = e.target.value;
              }}
            />
            <label
              htmlFor="name"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
            >
              Nom
            </label>
            {errors.name && (
              <span className="text-red text-sm font-raleway">
                {errors.name.message}
              </span>
            )}
          </div>
          <label htmlFor="format">Format préféré</label>
          <select
            name="format"
            className="w-full h-12 px-4 py-2 bg-grey rounded-xl focus:outline-blue"
            onChange={(e) => {
              formatRef.current = e.target.value;
            }}
          >
            <option value="video">Vidéo</option>
            <option value="text">Texte</option>
          </select>
          <div className="flex justify-center">
            <button
              type="submit"
              className="flex items-center justify-center gap-5 px-5 py-3 mt-8 mb-7 text-black font-medium align-middle rounded-2xl w-fit bg-white"
            >
              Terminer
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
