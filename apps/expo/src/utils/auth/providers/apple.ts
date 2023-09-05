import { AppleAuthenticationScope, signInAsync } from "expo-apple-authentication"
import { CryptoDigestAlgorithm, digestStringAsync, randomUUID } from "expo-crypto"

import { supabase } from "~/utils/auth/supabase"

/**
 * Initiates the auth flow for the native Apple Sign In.
 * Returns the token and nonce that will later be passed
 * to Supabase to complete the sign in.
 */
export async function signInWithApple() {
  const rawNonce = randomUUID()
  const hashedNonce = await digestStringAsync(CryptoDigestAlgorithm.SHA256, rawNonce)

  const credential = await signInAsync({
    requestedScopes: [AppleAuthenticationScope.FULL_NAME, AppleAuthenticationScope.EMAIL],
    nonce: hashedNonce,
  })

  const token = credential.identityToken
  if (!token) throw new Error("No id token")

  const response = await supabase.auth.signInWithIdToken({
    provider: "apple",
    token,
    nonce: rawNonce,
  })

  return response
}
