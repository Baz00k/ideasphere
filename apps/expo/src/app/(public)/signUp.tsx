import { useEffect, useState } from "react"
import { Alert, ScrollView, Text, View } from "react-native"
import { openURL } from "expo-linking"
import { Link } from "expo-router"

import { Button, Input } from "~/components/base"
import { api } from "~/utils/api"

const SignUp: React.FC = () => {
  const [username, setUsername] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("")

  const {
    mutate: createUser,
    isLoading,
    data,
    error,
  } = api.auth.createUser.useMutation({
    onSuccess() {
      setUsername("")
      setEmail("")
      setPassword("")
      setPasswordConfirmation("")
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

  useEffect(() => {
    if (error?.data?.code !== "BAD_REQUEST" || !error?.message) return
    Alert.alert("Błąd rejestracji", error.message)
  }, [error])

  const verifyEmail = async (url: string) => {
    await openURL(url)
  }

  const handleSignUp = () => {
    createUser({ username, email, password, passwordConfirmation })
  }

  return (
    <>
      <ScrollView
        className="flex w-full flex-col"
        contentContainerStyle={{ justifyContent: "center", flexGrow: 1 }}
      >
        <View className="mt-auto w-full">
          <Text className="mb-12 text-center font-comfortaa_400 text-4xl text-secondary">
            Rejestracja
          </Text>
          <View className="mx-auto flex w-full max-w-xs gap-y-1">
            <Input
              value={username}
              onChangeText={(text) => setUsername(text)}
              placeholder="Nazwa użytkownika"
              textContentType="username"
              autoCapitalize="none"
              roundness="3xl"
              className="text-center"
              error={error?.data?.zodError?.fieldErrors?.username}
            />
            <Input
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder="E-mail"
              textContentType="emailAddress"
              keyboardType="email-address"
              autoCapitalize="none"
              roundness="3xl"
              className="text-center"
              error={error?.data?.zodError?.fieldErrors?.email}
            />
            <Input
              value={password}
              onChangeText={(text) => setPassword(text)}
              placeholder="Hasło"
              textContentType="password"
              secureTextEntry
              autoCapitalize="none"
              roundness="3xl"
              className="text-center"
              error={error?.data?.zodError?.fieldErrors?.password}
            />
            <Input
              value={passwordConfirmation}
              onChangeText={(text) => setPasswordConfirmation(text)}
              placeholder="Potwierdź hasło"
              textContentType="password"
              secureTextEntry
              autoCapitalize="none"
              roundness="3xl"
              className="text-center"
              error={error?.data?.zodError?.fieldErrors?.passwordConfirmation}
            />
            <Button
              className="w-48 self-center"
              onPress={handleSignUp}
              text="Zarejestruj się"
              loading={isLoading}
              color="secondary"
              type="outline"
              disabled={!username || !email || !password || !passwordConfirmation}
            />
          </View>
        </View>

        <View className="mb-2 mt-auto flex flex-row justify-center pt-4">
          <Text className="text-md text-gray-100">
            Masz już konto?{" "}
            <Link href="/logIn" className="text-md text-secondary">
              Zaloguj się!
            </Link>
          </Text>
        </View>
      </ScrollView>
    </>
  )
}

export default SignUp
