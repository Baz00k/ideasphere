import { getBaseUrl } from "~/utils/api"
import { supabase } from "~/utils/auth/supabase"

const signInWithEmailAndPass = async (email: string, password: string) => {
  const response = await supabase.auth.signInWithPassword({ email, password })

  return response
}

const signUpWithEmailAndPass = async (email: string, password: string, username: string) => {
  const response = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username },
      emailRedirectTo: `${getBaseUrl()}/auth/verify-email`,
    },
  })

  return response
}

export { signInWithEmailAndPass, signUpWithEmailAndPass }
