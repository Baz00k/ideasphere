import { Text, TextInput, View } from "react-native"
import type { TextInputProps } from "react-native"
import { tv } from "tailwind-variants"
import type { VariantProps } from "tailwind-variants"

const inputVariants = tv({
  slots: {
    wrapper: "flex flex-col",
    input: "w-full mb-2",
    error: "text-red-500 text-sm mb-3 px-2",
  },
  variants: {
    size: {
      sm: {
        input: "text-sm px-2 py-1",
      },
      md: {
        input: "text-md px-4 py-2",
      },
      lg: {
        input: "text-lg px-6 py-3",
      },
      xl: {
        input: "text-xl px-8 py-4",
      },
    },
    color: {
      white: {
        input: "bg-white",
      },
      translucent: {
        input: "bg-gray-100/20",
      },
    },
    roundness: {
      none: {
        input: "rounded-none",
      },
      sm: {
        input: "rounded-sm",
      },
      md: {
        input: "rounded-md",
      },
      lg: {
        input: "rounded-lg",
      },
      xl: {
        input: "rounded-xl",
      },
      "2xl": {
        input: "rounded-2xl",
      },
      "3xl": {
        input: "rounded-3xl",
      },
    },
  },
  defaultVariants: {
    size: "md",
    color: "white",
    roundness: "md",
  },
})

interface InputProps extends TextInputProps, VariantProps<typeof inputVariants> {
  error?: string | string[]
}

export const Input: React.FC<InputProps> = ({ size, color, roundness, ...props }) => {
  const { wrapper, input, error } = inputVariants({ size, color, roundness })

  return (
    <View className={wrapper()}>
      <TextInput className={input()} {...props} />
      <Text className={error()}>{props.error}</Text>
    </View>
  )
}
