import { useEffect, useState } from "react"
import { Alert, Text, View } from "react-native"
import { openURL } from "expo-linking"
import { Link } from "expo-router"

import { Button, Input } from "~/components/base"
import { api, getBaseUrl } from "~/utils/api"

const SignUp: React.FC = () => {
  const [username, setUsername] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const {
    mutate: createUser,
    error,
    isLoading,
    data,
  } = api.auth.createUser.useMutation({
    onSuccess() {
      setUsername("")
      setEmail("")
      setPassword("")
    },
  })

  useEffect(() => {
    if (!data) return
    Alert.alert(
      "Utworzono konto",
      "Właśnie otworzył się link weryfikacyjny w przeglądarce. W przyszłości zostanie on wysłany na maila. Nawet jeśli strona nie otworzyła się, nie przejmuj się. Twoje konto zostało zweryfikowane. Możesz teraz się zalogować.",
    )
    void verifyEmail(data)
  }, [data])

  const verifyEmail = async (url: string) => {
    await openURL(url)
  }

  const handleSignUp = () => {
    createUser({ username, email, password, redirectUrl: `${getBaseUrl()}/auth/verify` })
  }

  return (
    <>
      <Text className="mx-auto mb-12 mt-auto font-comfortaa_400 text-4xl text-secondary">
        Rejestracja
      </Text>
      <View className="flex w-10/12 flex-col gap-y-8">
        <Input
          value={username}
          onChangeText={(text) => setUsername(text)}
          placeholder="Nazwa użytkownika"
          textContentType="username"
          autoCapitalize="none"
        />
        <Input
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="E-mail"
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Input
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Hasło"
          textContentType="password"
          secureTextEntry
          autoCapitalize="none"
        />

        <Button
          className="self-center"
          onPress={handleSignUp}
          text="Zarejestruj się"
          loading={isLoading}
        />
      </View>

      {/* TODO: Better error handling */}
      {error?.data?.zodError && (
        <View className="my-8">
          <View className="flex gap-y-2 rounded bg-gray-100/50 p-4">
            {Object.keys(error.data.zodError.fieldErrors).map((key) => (
              <Text key={key} className="text-center text-red-500">
                {key}: {error.data!.zodError!.fieldErrors[key]}
              </Text>
            ))}
          </View>
        </View>
      )}

      <View className="mb-2 mt-auto flex flex-row justify-center pt-4">
        <Text className="text-md text-gray-100">
          Masz już konto?{" "}
          <Link href="/logIn" className="text-md text-secondary">
            Zaloguj się!
          </Link>
        </Text>
      </View>
    </>
  )
}

export default SignUp
