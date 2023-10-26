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
        <button
          onClick={() => {
            router.push("/settings");
          }}
        >
          {/* <Image src={LeftArrowIcon} alt="Left Arrow" /> */}
        </button>
        <h1 className="text-3xl font-extrabold text-center">Paramètres</h1>
      </div>

      <section className="w-full max-w-md mx-auto mt-10">
        <button onClick={handleSignOut} className="bg-red">
          Sign out
        </button>

        <h2 className="mb-6 text-2xl font-extrabold text-center">
          Informations personnelles
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
              className={`block rounded-2xl px-4 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-grey border-2 border-grey focus-rainbow dark:bg-gray-700 border-0 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                errors.name ? "bg-red-dark2" : "bg-grey"
              }`}
              placeholder=" "
              {...register("name", {
                required: "Le nom est obligatoire",
              })}
            />
            <label
              htmlFor=""
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
          <div className="relative">
            <input
              type="email"
              id="email"
              className={`block rounded-2xl px-4 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-grey border-2 border-grey focus-rainbow dark:bg-gray-700 border-0 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                errors.email ? "bg-red-dark2" : "bg-grey"
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
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
            >
              E-mail
            </label>
            {errors.email && (
              <span className="text-red text-sm font-raleway">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* <div className="relative">
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
          </div> */}

          {/* <div className="relative">
            <input
              type="password"
              id="password-confirm"
              className={`block rounded-2xl px-4 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-grey border-2 border-grey focus-rainbow dark:bg-gray-700 border-0 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${errors.passwordConfirm ? "bg-red-dark2" : "bg-grey"
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
              <span className="text-red text-sm font-raleway">{errors.passwordConfirm.message}</span>
            )}
          </div> */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="flex items-center justify-center gap-5 px-5 py-3 mt-8 mb-7 text-black font-medium align-middle rounded-2xl w-fit bg-white"
            >
              Sauvegarder
            </button>
          </div>
        </form>
      </section>

      <section className="w-full max-w-md mx-auto mt-10">
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
