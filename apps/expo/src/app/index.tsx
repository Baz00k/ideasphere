import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Input } from "~/components/input";
import Logo from "../../assets/ideasphere_logo.png";

const Index = () => {
  return (
    <SafeAreaView className="flex h-full flex-col items-center bg-white">
      <Image
        source={Logo}
        alt="IdeaSphere Logo"
        className="mx-auto mb-12 mt-10"
      />
      <View className="flex w-full flex-grow flex-col items-center justify-center rounded-t-3xl bg-primary p-4 ">
        <Text className="mx-auto mb-12 mt-auto text-4xl text-secondary">
          Zaloguj się
        </Text>
        <View className="flex w-10/12 flex-col gap-y-8">
          <Input
            placeholder="E-mail"
            textContentType="emailAddress"
            keyboardType="email-address"
          />
          <Input
            placeholder="Hasło"
            textContentType="password"
            secureTextEntry
          />
          <View>
            <Text className="mx-auto mb-4 text-sm text-gray-500">
              Lub kontynuuj z:
            </Text>
            <View className="flex flex-row justify-center gap-2">
              <View className="flex w-1/6 flex-row items-center justify-center rounded-lg bg-[#DB4437]">
                <Text className="p-2 text-sm text-white">G</Text>
              </View>
              <View className="flex w-1/6 flex-row items-center justify-center rounded-lg bg-[#3B5998]">
                <Text className="p-2 text-sm text-white">F</Text>
              </View>
              <View className="flex w-1/6 flex-row items-center justify-center rounded-lg bg-[#303030]">
                <Text className="p-2 text-sm text-white">A</Text>
              </View>
            </View>
          </View>
          <Pressable
            className="self-center rounded-full border border-secondary p-4"
            onPress={() => {
              console.log("Login");
            }}
          >
            <Text className="text-md text-secondary">Zaloguj się</Text>
          </Pressable>
        </View>
        <View className="mb-4 mt-auto flex flex-row justify-center">
          <Text className="text-md text-gray-800">
            Nie masz jeszcze konta?{" "}
            <Text className="text-md text-secondary">Zarejestruj się</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Index;
