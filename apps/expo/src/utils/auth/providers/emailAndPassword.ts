import { supabase } from "~/utils/auth/supabase"

const signInWithEmailAndPass = async (email: string, password: string) => {
  const response = await supabase.auth.signInWithPassword({ email, password })

  return response
}

const signUpWithEmailAndPass = async (email: string, password: string) => {
  const response = await supabase.auth.signUp({ email, password })

  console.log(response)

  return response
}

export { signInWithEmailAndPass, signUpWithEmailAndPass }
