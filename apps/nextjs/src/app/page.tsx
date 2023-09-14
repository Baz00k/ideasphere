"use client"

import Link from "next/link"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"

import { api } from "~/utils/api"

export default function HomePage() {
  return (
    <main className="flex h-screen flex-col items-center bg-gradient-to-b from-secondary to-primary text-white">
      <div className="container mt-12 flex flex-col items-center justify-center gap-y-12 px-4 py-8">
        <h1 className="font-comfortaa_next text-5xl font-bold sm:text-[5rem]">Ideasphere</h1>
        <p className="text-center text-2xl">
          Miejsce do dzielenia się swoimi pomysłami i inspiracji
        </p>
        <AuthShowcase />
      </div>
    </main>
  )
}

function AuthShowcase() {
  const supabase = useSupabaseClient()
  const user = useUser()
  const { data: profile, isLoading } = api.auth.getProfile.useQuery(undefined, { enabled: !!user })

  if (!user) {
    return (
      <Link
        className="flex items-center gap-1 rounded-lg bg-white/10 px-10 py-3 font-semibold text-zinc-200 no-underline transition hover:bg-white/20"
        href="/signin"
      >
        Zaloguj się
      </Link>
    )
  }

  if (isLoading) {
    return <p className="text-center text-2xl text-zinc-200">Ładowanie...</p>
  }

  return (
    <>
      <p className="text-center text-2xl text-zinc-200">
        {profile && <span>Zalogowano jako @{profile.username}</span>}
      </p>
      <button
        className="rounded-lg bg-white/10 px-10 py-3 font-semibold text-zinc-200 no-underline transition hover:bg-white/20"
        onClick={() => void supabase.auth.signOut()}
      >
        Wyloguj
      </button>
    </>
  )
}
