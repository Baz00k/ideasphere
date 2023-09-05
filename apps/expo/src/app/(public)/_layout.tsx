import { useState } from "react"
import { Image, Keyboard, Pressable, TouchableWithoutFeedback, View } from "react-native"
import { PanGestureHandler } from "react-native-gesture-handler"
import Animated, {
  FadeIn,
  FadeOut,
  Layout,
  SlideInDown,
  SlideOutDown,
} from "react-native-reanimated"
import { SafeAreaView } from "react-native-safe-area-context"
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
                className="my-10"
                style={{
                  width: 200,
                  height: 55,
                  resizeMode: "contain",
                }}
              />
              {!cardShown && (
                <Animated.View entering={FadeIn} exiting={FadeOut} className="w-2/3">
                  <Button onPress={() => setCardShown(true)} text="Zaczynamy!" />
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
