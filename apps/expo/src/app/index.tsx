import React, { useState } from "react";
import { Image, Pressable } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  FadeIn,
  FadeOut,
  Layout,
  SlideInDown,
  SlideOutDown,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button, Login } from "~/components";
import Logo from "../../assets/ideasphere_logo.png";

const Index = () => {
  const [cardShown, setCardShown] = useState(false);

  return (
    <SafeAreaView className="flex h-full flex-col items-center justify-center bg-white">
      <Animated.View className="w-full" layout={Layout.damping(0.5)}>
        <Pressable onPress={() => cardShown && setCardShown(false)}>
          <Image
            source={Logo}
            alt="IdeaSphere Logo"
            className="mx-auto my-10"
          />
          {!cardShown && (
            <Animated.View entering={FadeIn} exiting={FadeOut}>
              <Button
                onPress={() => setCardShown(true)}
                text="Zaczynamy!"
                className="mx-auto min-w-[50%]"
              />
            </Animated.View>
          )}
        </Pressable>
      </Animated.View>
      {cardShown && (
        <PanGestureHandler
          // Swipe down to close
          onGestureEvent={({ nativeEvent }) => {
            if (nativeEvent.translationY > 100) {
              setCardShown(false);
            }
          }}
          maxPointers={1}
        >
          <Animated.View
            className="flex w-full flex-grow flex-col items-center justify-center overflow-hidden rounded-t-3xl bg-primary px-4 py-8"
            entering={SlideInDown.delay(150)}
            exiting={SlideOutDown}
          >
            <Login />
          </Animated.View>
        </PanGestureHandler>
      )}
    </SafeAreaView>
  );
};

export default Index;
