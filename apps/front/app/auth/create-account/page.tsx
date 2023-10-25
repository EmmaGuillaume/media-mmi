"use client";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { useForm } from "react-hook-form";
// import { toast } from "react-toastify";
import Link from "next/link";
// import fetcher from "@/libs/fetcher";
import { v4 as uuid } from "uuid";
import { useAtomValue } from "jotai";
import { accessTokenAtom } from "@/store";
import { getAuthTokenCodeVerifierCookie } from "@/lib/cookies";

interface IFormInput {
  email: string;
  password: string;
}

export default function CreateAccount() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const accessToken = useAtomValue(accessTokenAtom);

  const onSubmit = async (data: IFormInput) => {
    const { error: signUpError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: `${location.origin}/auth/create-password?email=${data.email}`,
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
    <div className="flex items-center justify-center h-screen text-blue">
      <div className="flex flex-col justify-center w-full h-screen px-12 align-middle bg-white text-primary-blue md:flex-row md:h-fit md:shadow-lg md:px-0 md:mx-8 md:w-10/12 lg:w-6/12">
        <div className="relative flex flex-col justify-center w-full align-middle md:w-9/12 md:px-12 md:py-10 ">
          <div className="flex flex-col gap-4 ">
            <h2 className="text-xl font-normal font-title">Create Account</h2>
            <form
              className="flex flex-col gap-4 text-base font-text"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              <label className="flex flex-col" htmlFor="">
                E-mail
                <input
                  className={`"placeholder:text-black-40 px-2 py-1.5 border rounded-md focus:border-[#2684FF] focus:outline-none focus:border-[2px]" ${
                    errors.email ? "border-red-500" : "border-black-20"
                  }`}
                  type="email"
                  placeholder="E-mail"
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
              <label className="flex flex-col" htmlFor="">
                Password
                <input
                  className={`"placeholder:text-black-40 px-2 py-1.5 border rounded-md focus:border-[#2684FF] focus:outline-none focus:border-[2px]" ${
                    errors.email ? "border-red-500" : "border-black-20"
                  }`}
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    required: "The password filed is required",
                  })}
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email.message}</span>
                )}
              </label>
              <button
                type="submit"
                className="flex items-center justify-center gap-5 px-12 py-3 mt-2 text-white align-middle rounded-md w-fit bg-blue-dark1 hover:bg-orange-hover"
              >
                Register
              </button>
            </form>
            <label className="text-center ">Or sign in with</label>
            <Link className="text-xs text-grey" href="/auth">
              I already have an account!
            </Link>
          </div>
        </div>
        <div className="hidden bg-cover bg-login md:flex md:w-3/12"></div>
      </div>
    </div>
  );
}
