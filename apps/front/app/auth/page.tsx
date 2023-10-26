"use client";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { accessTokenAtom } from "@/store";
import { useAtom, useAtomValue } from "jotai";
import { GetServerSideProps } from "next";
import axios from "axios";

interface IFormInput {
  email: string;
  password: string;
}

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit = async (data: IFormInput) => {
    const {
      data: { session },
      error,
    } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (!error && session) {
      console.log("🚀 ~ file: page.tsx:39 ~ onSubmit ~ session:", session);
      router.replace("/");
      setAccessToken(session.access_token);
      fetch("https://akoro-backend.up.railway.app/", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
        .then((response) => {
          // handle the response
          if (response.ok) {
            console.log("response ok");
          } else {
            console.log("response NOT ok");
          }
        })
        .catch((error) => {
          // handle the error
          console.error(error);
        });
    }

    if (error) {
      console.error('error : ',error.message);
    }
  };

  return (
    <main className="px-6 pt-10 font-raleway mb-36">
      <div className="flex items-center justify-center w-full gap-8">
        <h1 className="text-3xl font-extrabold text-center">Connexion</h1>
      </div>
      <section className="w-full mt-10">
        <form
          className="flex flex-col w-full max-w-md mx-auto gap-4"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="relative">
            <input
              type="email"
              id="email"
              className={`block rounded-2xl px-4 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-grey border-2 border-grey focus-rainbow dark:bg-gray-700 border-0 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${errors.email ? "bg-red-dark2" : "bg-grey"
                }`}
              placeholder=" "
              {...register("email", {
                required: "L'e-mail est obligatoire",
                pattern: {
                  value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/,
                  message: "L'e-mail saisi n'est pas valide",
                },
              })}
            />
            <label
              htmlFor=""
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">
              E-mail
            </label>
            {errors.email && (
              <span className="text-red text-sm font-raleway">{errors.email.message}</span>
            )}
          </div>

          <div className="relative">
            <input
              type="password"
              id="password"
              className={`block rounded-2xl px-4 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-grey border-2 border-grey focus-rainbow dark:bg-gray-700 border-0 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${errors.password ? "bg-red-dark2" : "bg-grey"
                }`}
              placeholder=" "
              {...register("password", {
                required: "Le mot de passe est obligatoire",
              })}
            />
            <label
              htmlFor=""
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">
              Mot de passe
            </label>
            {errors.password && (
              <span className="text-red text-sm font-raleway">{errors.password.message}</span>
            )}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="flex items-center justify-center gap-5 px-5 py-3 mt-8 mb-7 text-black font-medium align-middle rounded-2xl w-fit bg-white"
            >
              Se connecter
            </button>
          </div>
        </form>
        <div className="flex flex-col items-center justify-center">
          {/* <Link className="text-white mb-4 text-sm font-light" href="#">
            Mot de passe oublié ?
          </Link> */}
          <Link className="text-white mb-4 text-sm font-light" href="/auth/create-account">
            Créer un compte
          </Link>
          <Link className="text-white text-sm font-light" href="/">
            Continuer sans se connecter
          </Link>
        </div>
      </section>
    </main>
  );
}
