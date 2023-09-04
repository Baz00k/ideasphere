import React from "react"
import { ActivityIndicator, Pressable, Text  } from "react-native"
import type {PressableProps} from "react-native";

interface ButtonProps extends PressableProps {
  text?: string
  // TODO: Add loading indicator
  loading?: boolean
}

export const Button: React.FC<ButtonProps> = ({ className, children, text, ...props }) => {
  return (
    <Pressable
      {...props}
      className={`flex flex-row items-center justify-center rounded-lg border border-secondary px-5 py-3 active:scale-95 active:transform disabled:bg-opacity-90 ${className}`}
      disabled={props.disabled ?? props.loading}
    >
      {props.loading && <ActivityIndicator className="mr-2" />}
      {text && <Text className="text-md text-center text-secondary">{text}</Text>}
      {typeof children === "function" ? children({ pressed: false }) : children}
    </Pressable>
  )
}
