import React from "react";
import { Text, View } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome";

import { Button, Input } from "~/components/base";

export const Login: React.FC = () => {
  return (
    <>
      <Text className="mx-auto mb-12 mt-auto text-4xl text-secondary">
        Zaloguj się
      </Text>
      <View className="flex w-10/12 flex-col gap-y-8">
        <Input
          placeholder="E-mail"
          textContentType="emailAddress"
          keyboardType="email-address"
        />
        <Input placeholder="Hasło" textContentType="password" secureTextEntry />
        <View>
          <Text className="mx-auto mb-4 text-sm text-gray-500">
            Lub kontynuuj z:
          </Text>
          <View className="flex flex-row justify-center gap-2 h-10">
            <View className="flex w-1/6 flex-row items-center justify-center rounded-lg bg-[#DB4437]">
              <Icon name="google" size={20} color="white" />
            </View>
            <View className="flex w-1/6 flex-row items-center justify-center rounded-lg bg-[#3B5998]">
              <Icon name="facebook" size={20} color="white" />
            </View>
            <View className="flex w-1/6 flex-row items-center justify-center rounded-lg bg-[#303030]">
              <Icon name="apple" size={20} color="white" />
            </View>
          </View>
        </View>
        <Button
          className="self-center"
          onPress={() => {
            console.log("Login");
          }}
          text="Zaloguj się"
        />
      </View>
      <View className="mb-4 mt-auto flex flex-row justify-center pt-4">
        <Text className="text-md text-gray-800">
          Nie masz jeszcze konta?{" "}
          <Text className="text-md text-secondary">Zarejestruj się</Text>
        </Text>
      </View>
    </>
  );
};
