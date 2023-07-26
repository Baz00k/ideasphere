import React, { useEffect, useState } from "react"
import { Alert, Text, View } from "react-native"
import * as AppleAuth from "expo-apple-authentication"
import { Link } from "expo-router"
import Icon from "@expo/vector-icons/FontAwesome"

import { signInWithApple, signUpWithEmailAndPass } from "~/utils/auth"
import { Button, Input } from "~/components/base"

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>("")
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
      const { error } = await signUpWithEmailAndPass(email, password, username)

      if (error) {
        Alert.alert(error.message)
        return
      }

      Alert.alert(
        "Rejestracja zakończona sukcesem!",
        "Sprawdź swoją skrzynkę pocztową, aby zweryfikować konto.",
      )
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Text className="mx-auto mb-12 mt-auto text-4xl text-secondary">Rejestracja</Text>
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
        <View>
          <Text className="mx-auto mb-4 text-sm text-gray-500">Lub kontynuuj z:</Text>
          <View className="flex h-10 flex-row justify-center gap-2">
            <View className="flex w-1/6 flex-row items-center justify-center rounded-lg bg-[#DB4437]">
              <Icon name="google" size={20} color="white" />
            </View>
            <View className="flex w-1/6 flex-row items-center justify-center rounded-lg bg-[#3B5998]">
              <Icon name="facebook" size={20} color="white" />
            </View>
          </View>
          {isAppleSignInAvailable && (
            <AppleAuth.AppleAuthenticationButton
              buttonType={AppleAuth.AppleAuthenticationButtonType.SIGN_UP}
              buttonStyle={AppleAuth.AppleAuthenticationButtonStyle.BLACK}
              className="mx-auto h-14 w-1/2"
              cornerRadius={8}
              onPress={signInWithApple}
            />
          )}
        </View>
        <Button
          className="self-center"
          onPress={handleLogin}
          text="Zarejestruj się"
          loading={loading}
        />
      </View>
      <View className="mb-2 mt-auto flex flex-row justify-center pt-4">
        <Text className="text-md text-gray-800">
          Masz już konto?{" "}
          <Link href="/logIn" className="text-md text-secondary">
            Zaloguj się!
          </Link>
        </Text>
      </View>
    </>
  )
}

export default Register
