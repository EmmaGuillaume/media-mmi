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
      router.replace("./home");
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
      console.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen text-blue">
      <div className="flex flex-col justify-center w-full h-screen px-12 align-middle bg-white text-primary-blue md:flex-row md:h-fit md:shadow-lg md:px-0 md:mx-8 md:w-10/12 lg:w-6/12">
        <div className="relative flex flex-col justify-center w-full align-middle md:w-9/12 md:px-12 md:py-10 ">
          <Image
            className="absolute hidden top-2 left-2"
            src="/images/theseus_black.png"
            alt=""
            width={100}
            height={100}
          />
          <div className="flex flex-col gap-4 ">
            <h2 className="text-xl font-normal font-title">Login</h2>
            <form
              className="flex flex-col gap-4 text-base font-text"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              <label className="flex flex-col" htmlFor="">
                E-mail
                <input
                  className={`"placeholder:text-black-40 px-2 py-1.5 border rounded-md focus:outline-[#2684FF]" ${
                    errors.email ? "border-red-500" : "border-black-20"
                  }`}
                  type="email"
                  placeholder="E-mail"
                  // onChange={(e) => setEmail(e.target.value)}
                  {...register("email", {
                    required: "The email filed is required",
                    pattern: {
                      value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/,
                      message: "You must enter a valid email",
                    },
                  })}
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email.message}</span>
                )}
              </label>
              <label className="flex flex-col">
                Password
                <div className="flex items-center gap-2">
                  <input
                    className={`placeholder:text-black-40 px-2 py-1.5 border rounded-md focus:outline-[#2684FF] w-full ${
                      errors.password ? "border-red-500" : "border-black-20"
                    }`}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...register("password", { required: true })}
                  />
                </div>
                {errors.password && (
                  <span className="text-red-500">
                    This password field is required
                  </span>
                )}
                <Link
                  className="text-xs text-grey w-fit"
                  href="/auth/forgot-password"
                >
                  Forgot password?
                </Link>
                <Link className="text-xs text-grey" href="/auth/create-account">
                  {`Don't have an account? Register!`}
                </Link>
              </label>
              <button
                type="submit"
                className="flex items-center justify-center gap-5 px-12 py-3 mt-2 text-blue-500 align-middle rounded-md w-fit "
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
        <div className="hidden bg-cover bg-login md:flex md:w-3/12"></div>
      </div>
    </div>
  );
}
