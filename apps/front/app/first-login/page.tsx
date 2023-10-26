"use client";
import { useRef } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

// import LeftArrowIcon from "@/public/images/icons/left-arrow.svg";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { getAuthTokenCodeVerifierCookie } from "@/lib/cookies";
interface IFormInput {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export default function Settings() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>();
  const router = useRouter();
  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      router.replace("/auth");
    } catch (error) {
      console.error("error : ", error);
    }
  };

  const onSubmit = async (data: IFormInput) => {
    const { error: signUpError } = await supabase.auth.updateUser({
      email: data.email,
      password: data.password,
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
        <h1 className="text-3xl font-extrabold text-center">On boarding</h1>
      </div>

      <section className="w-full max-w-md mx-auto mt-10">
        <h2 className="mb-4 text-xl font-bold">Choisis ton format préféré</h2>
        <form className="flex flex-col items-center w-full gap-4">
          <select
            name="format"
            className="w-full h-12 px-4 py-2 bg-grey rounded-xl focus:outline-blue"
          >
            <option value="video">Vidéo</option>
            <option value="text">Text</option>
          </select>
          <button
            type="submit"
            className="bg-green-light2 py-3 px-8 rounded-full text-black"
          >
            {"C'est parti !"}
          </button>
        </form>
      </section>
    </main>
  );
}
