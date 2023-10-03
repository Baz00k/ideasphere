import { useState } from "react"
import { Keyboard, Pressable, Text, TouchableWithoutFeedback, View } from "react-native"
import { PanGestureHandler } from "react-native-gesture-handler"
import Animated, {
  FadeIn,
  FadeOut,
  Layout,
  SlideInDown,
  SlideOutDown,
} from "react-native-reanimated"
import { SafeAreaView } from "react-native-safe-area-context"
import { Image } from "expo-image"
import { Slot } from "expo-router"
import Logo from "assets/ideasphere_logo.png"

import { Button } from "~/components"

const LogInLayout = () => {
  const [cardShown, setCardShown] = useState(false)

  return (
    <SafeAreaView className="bg-white">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex h-full flex-col items-center justify-center">
          <Animated.View layout={Layout.damping(0.5)} className="w-full">
            <Pressable
              onPress={() => cardShown && setCardShown(false)}
              className="flex w-full items-center"
            >
              <Image
                source={Logo}
                alt="IdeaSphere Logo"
                className="my-8"
                style={{
                  width: 200,
                  height: 55,
                }}
                contentFit="contain"
              />
              {!cardShown && (
                <Animated.View
                  entering={FadeIn}
                  exiting={FadeOut}
                  className="flex w-full items-center gap-8"
                >
                  <Text className="text-center font-comfortaa_300 text-xs">
                    Miejsce do dzielenia się swoimi pomysłami i inspiracjami
                  </Text>
                  <Button onPress={() => setCardShown(true)} text="Zaczynamy!" className="w-2/3" />
                </Animated.View>
              )}
            </Pressable>
          </Animated.View>
          {cardShown && (
            <PanGestureHandler
              // Swipe down to close
              onGestureEvent={({ nativeEvent }) => {
                if (nativeEvent.translationY > 100) {
                  setCardShown(false)
                }
              }}
              maxPointers={1}
            >
              <Animated.View
                className="flex w-full flex-grow flex-col items-center justify-center overflow-hidden rounded-t-3xl bg-primary px-4 py-8"
                entering={SlideInDown.delay(150)}
                exiting={SlideOutDown}
              >
                <Slot />
              </Animated.View>
            </PanGestureHandler>
          )}
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

export default LogInLayout
