import React from "react"
import { TextInput } from "react-native"
import type { TextInputProps } from "react-native"

export const Input: React.FC<TextInputProps> = ({ className, ...props }) => {
  return (
    <TextInput {...props} className={`w-full rounded-3xl bg-white p-2 text-center ${className}`} />
  )
}
