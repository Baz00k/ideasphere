import React, { useEffect, useState } from "react"
import { Alert, Text, View } from "react-native"
import * as AppleAuth from "expo-apple-authentication"
import { Link, useRouter } from "expo-router"
import Icon from "@expo/vector-icons/FontAwesome"

import { Button, Input } from "~/components/base"
import { signInWithApple, signInWithEmailAndPass } from "~/utils/auth"

const Login: React.FC = () => {
  const router = useRouter()

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const [loading, setLoading] = useState<boolean>(false)

  const [isAppleSignInAvailable, setIsAppleSignInAvailable] = useState<boolean>(false)

  useEffect(() => {
    const checkIfAppleSignInIsAvailable = async () => {
      const isAvailable = await AppleAuth.isAvailableAsync()
      setIsAppleSignInAvailable(isAvailable)
    }

    void checkIfAppleSignInIsAvailable()
  }, [])

  const handleLogin = async () => {
    setLoading(true)
    try {
      const { error } = await signInWithEmailAndPass(email, password)

      if (error) {
        if (error.status === 400) {
          Alert.alert("Błąd", "Niepoprawny email lub hasło")
        } else if (error.status === 500) {
          Alert.alert("Błąd", "Wystąpił błąd serwera")
        } else {
          Alert.alert("Błąd", "Wystąpił nieznany błąd")
        }

        return
      }

      router.push("/home")
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Text className="mx-auto mb-12 mt-auto text-4xl text-secondary">Zaloguj się</Text>
      <View className="flex w-10/12 flex-col gap-y-8">
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
        {false && ( // TODO: Uncomment when social auth is implemented
          <View className="mx-auto flex w-52 flex-col gap-y-4">
            <Text className="text-center text-sm text-gray-500">Lub kontynuuj z:</Text>
            <View className="flex w-full flex-row items-center justify-center gap-x-2">
              <View className="flex flex-row items-center justify-center rounded-lg bg-[#DB4437] px-6 py-1">
                <Icon name="google" size={20} color="white" />
              </View>
              <View className="flex flex-row items-center justify-center rounded-lg bg-[#3B5998] px-6 py-1">
                <Icon name="facebook" size={20} color="white" />
              </View>
            </View>
            {isAppleSignInAvailable && (
              <AppleAuth.AppleAuthenticationButton
                buttonType={AppleAuth.AppleAuthenticationButtonType.SIGN_IN}
                buttonStyle={AppleAuth.AppleAuthenticationButtonStyle.BLACK}
                className="mx-auto h-14 w-1/2"
                cornerRadius={8}
                onPress={signInWithApple}
              />
            )}
          </View>
        )}
        <Button
          className="self-center"
          onPress={handleLogin}
          text="Zaloguj się"
          loading={loading}
        />
      </View>
      <View className="mb-2 mt-auto flex flex-row justify-center pt-4">
        <Text className="text-md text-gray-800">
          Nie masz jeszcze konta?{" "}
          <Link href="/register" className="text-md text-secondary">
            Zarejestruj się!
          </Link>
        </Text>
      </View>
    </>
  )
}

export default Login
