import React from "react";
import { Pressable, Text, type PressableProps } from "react-native";

interface ButtonProps extends PressableProps {
  text?: string;
}

export const Button: React.FC<ButtonProps> = ({
  className,
  children,
  text,
  ...props
}) => {
  return (
    <Pressable
      {...props}
      className={`rounded-lg border border-secondary px-5 py-3 active:scale-95 active:transform ${className}`}
    >
      {text && <Text className="text-md text-secondary text-center">{text}</Text>}
      {typeof children === "function" ? children({ pressed: false }) : children}
    </Pressable>
  );
};
