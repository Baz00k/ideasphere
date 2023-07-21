import Link from "next/link";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

export default function HomePage() {
  return (
    <main className="flex h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container mt-12 flex flex-col items-center justify-center gap-4 px-4 py-8">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Create <span className="text-pink-400">T3</span> Turbo
        </h1>
        <AuthShowcase />
      </div>
    </main>
  );
}

function AuthShowcase() {
  const supabase = useSupabaseClient();
  const user = useUser();

  if (!user) {
    return (
      <Link
        className="flex items-center gap-1 rounded-lg bg-white/10 px-10 py-3 font-semibold text-zinc-200 no-underline transition hover:bg-white/20"
        href="/signin"
      >
        Sign In
      </Link>
    );
  }

  return (
    <>
      <p className="text-center text-2xl text-zinc-200">
        {user && <span>Logged in as {user?.user_metadata?.name}</span>}
      </p>
      <button
        className="rounded-lg bg-white/10 px-10 py-3 font-semibold text-zinc-200 no-underline transition hover:bg-white/20"
        onClick={() => void supabase.auth.signOut()}
      >
        Sign Out
      </button>
    </>
  );
}
