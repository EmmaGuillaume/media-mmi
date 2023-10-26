"use client";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { useForm } from "react-hook-form";
import React, { useRef } from 'react';
// import { toast } from "react-toastify";
import Link from "next/link";
// import fetcher from "@/libs/fetcher";
import { v4 as uuid } from "uuid";
import { useAtomValue } from "jotai";
import { accessTokenAtom } from "@/store";
import { getAuthTokenCodeVerifierCookie } from "@/lib/cookies";

interface IFormInput {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export default function CreateAccount() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>();
  const accessToken = useAtomValue(accessTokenAtom);

  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = async (data: IFormInput) => {
    const { error: signUpError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        // emailRedirectTo: `${location.origin}/auth/create-password?email=${data.email}`,
        emailRedirectTo: `${location.origin}/`,
      },
    });

    if (signUpError) {
      console.error(signUpError.message);
      return;
    }

    const { error: authTokenCodeVerifierError } = await supabase
      .from("user_auth_token_code_verifier")
      .insert({
        email: data.email,
        code_verifier: getAuthTokenCodeVerifierCookie(),
      });

    if (authTokenCodeVerifierError) {
      console.error(authTokenCodeVerifierError.message);
      return;
    }
  };

  return (
    <main className="px-6 pt-10 font-raleway mb-36">
      <div className="flex items-center justify-center w-full gap-8">
        <h1 className="text-3xl font-extrabold text-center">Créer un compte</h1>
      </div>
      <section className="w-full mt-10">
        <h2 className="mb-6 text-2xl font-extrabold">
          Informations personnelles
        </h2>
        <form
          className="flex flex-col w-full gap-4"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="relative">
            <input
              type="text"
              id=""
              className={`block rounded-xl px-4 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-grey dark:bg-gray-700 border-0 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${errors.name ? "bg-red-dark2" : "bg-grey"
                }`}
              placeholder=" "
              {...register("name", {
                required: "Le nom est obligatoire",
              })}
              />
            <label
              htmlFor=""
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">
              Nom
            </label>
            {errors.name && (
              <span className="text-red">{errors.name.message}</span>
            )}
          </div>
          <div className="relative">
            <input
              type="email"
              id=""
              className={`block rounded-xl px-4 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-grey dark:bg-gray-700 border-0 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${errors.email ? "bg-red-dark2" : "bg-grey"
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
              <span className="text-red">{errors.email.message}</span>
            )}
          </div>

          <div className="relative">
            <input
              type="password"
              id="password"
              className={`block rounded-xl px-4 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-grey dark:bg-gray-700 border-0 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${errors.password ? "bg-red-dark2" : "bg-grey"
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
              <span className="text-red">{errors.password.message}</span>
            )}
          </div>

          <div className="relative">
            <input
              type="password"
              id="password-confirm"
              className={`block rounded-xl px-4 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-grey dark:bg-gray-700 border-0 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${errors.passwordConfirm ? "bg-red-dark2" : "bg-grey"
                }`}
              placeholder=" "
              {...register("passwordConfirm", {
                required: "Le mot de passe de confirmation est obligatoire",
                validate: value =>
                  value === password.current || "Les mots de passe ne sont pas identiques",
              })}
            />
            <label
              htmlFor=""
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">
              Confirmation du mot de passe
            </label>
            {errors.passwordConfirm && (
              <span className="text-red">{errors.passwordConfirm.message}</span>
            )}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="flex items-center justify-center gap-5 px-5 py-3 mt-2 mb-7 text-black align-middle rounded-xl w-fit bg-white hover:bg-orange-hover"
            >
              Continuer
            </button>
          </div>
        </form>
        <div className="flex flex-col items-center justify-center">
          <Link className="text-white" href="/auth">
            Annuler
          </Link>
        </div>
      </section>
    </main>
  );
}
