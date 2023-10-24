import Link from "next/link";

export default function Home() {
  return (
    <main className="flex justify-center">
      <div className="text-purple bg-blue-light1">hello world </div>
      <Link href="/auth">connecte toi</Link>
    </main>
  );
}
