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
  const [isSignUp, setIsSignUp] = useState(false)

  const signInWithPassword = async () => {
    const { error, data } = isSignUp
      ? await supabase.auth.signUp({
          email,
          password,
        })
      : await supabase.auth.signInWithPassword({
          email,
          password,
        })
    if (error) alert(error.message)
    else if (isSignUp && data.user) {
      alert("Check your email for a confirmation link.")
      setIsSignUp(false)
    } else if (data.user) {
      router.push("/")
    }
  }

  return (
    <main className="flex h-screen bg-zinc-900 text-zinc-200">
      <div className="mx-auto flex flex-col items-center justify-center gap-6">
        <h1 className="text-3xl font-extrabold tracking-tight">Sign In</h1>
        <div className="flex w-full flex-col gap-4">
          <input
            className="rounded-lg bg-white/10 px-4 py-1 text-zinc-200 transition hover:bg-white/20"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <div className="relative">
            <input
              className="w-full rounded-lg bg-white/10 px-4 py-1 text-zinc-200 transition hover:bg-white/20"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button
              className="absolute bottom-0 right-0 top-0 flex items-center justify-center px-2"
              onClick={() => setShowPassword((s) => !s)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
          <button
            className="w-full rounded-lg bg-emerald-400 py-2 font-semibold text-zinc-900 no-underline transition hover:bg-emerald-500"
            onClick={signInWithPassword}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
          <button onClick={() => setIsSignUp((s) => !s)} className="mt-4">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
          </button>
        </div>
      </div>
    </main>
  )
}
