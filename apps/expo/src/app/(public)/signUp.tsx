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

  const verifyEmail = async (url: string) => {
    await openURL(url)
  }

  const handleSignUp = () => {
    createUser({ username, email, password, passwordConfirmation })
  }

  return (
    <>
      <ScrollView
        className="flex w-full flex-col px-4"
        contentContainerStyle={{ justifyContent: "center", flexGrow: 1 }}
      >
        <View className="w-full">
          <Text className="mb-12 text-center font-comfortaa_400 text-4xl text-secondary">
            Rejestracja
          </Text>
          <View className="mx-auto flex w-full max-w-xs gap-y-8">
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
            <Input
              value={passwordConfirmation}
              onChangeText={(text) => setPasswordConfirmation(text)}
              placeholder="Potwierdź hasło"
              textContentType="password"
              secureTextEntry
              autoCapitalize="none"
            />
            <Button
              className="w-48 self-center"
              onPress={handleSignUp}
              text="Zarejestruj się"
              loading={isLoading}
              color="secondary"
              type="outline"
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
