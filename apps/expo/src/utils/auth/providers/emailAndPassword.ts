import { supabase } from "~/utils/auth/supabase"

const signInWithEmailAndPass = async (email: string, password: string) => {
  const response = await supabase.auth.signInWithPassword({ email, password })

  return response
}

export { signInWithEmailAndPass }
