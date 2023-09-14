"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { Eye, EyeOff } from "lucide-react"

export default function SigninPage() {
  const supabase = useSupabaseClient()
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const signInWithPassword = async () => {
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) alert(error.message)
    else if (data.user) {
      router.push("/")
    }
  }

  return (
    <main className="flex h-screen bg-gradient-to-b from-secondary to-primary text-white">
      <div className="mx-auto flex min-w-fit flex-col items-center justify-center gap-6 text-white">
        <h1 className="font-comfortaa_next text-3xl font-bold">Logowanie</h1>
        <div className="flex w-full flex-col gap-6">
          <input
            className="rounded-lg bg-white/10 px-4 py-1  transition hover:bg-white/20"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <div className="relative">
            <input
              className="w-full rounded-lg bg-white/10 px-4 py-1 transition hover:bg-white/20"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Hasło"
            />
            <button
              className="absolute bottom-0 right-0 top-0 flex items-center justify-center px-2"
              onClick={() => setShowPassword((s) => !s)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
          <button
            className="w-full rounded-lg bg-secondary py-2 font-semibold text-white no-underline transition hover:bg-secondary/90"
            onClick={signInWithPassword}
          >
            Zaloguj się
          </button>
        </div>
      </div>
    </main>
  )
}
