import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native"
import type { TouchableOpacityProps } from "react-native"
import { twMerge } from "tailwind-merge"
import { tv } from "tailwind-variants"
import type { VariantProps } from "tailwind-variants"
import tailwindColors from "tailwindcss/colors"

import { colors } from "@ideasphere/tailwind-config/themeColors"

const buttonVariants = tv({
  slots: {
    base: "flex flex-row items-center justify-center border rounded-sm overflow-hidden",
    text: "text-center",
    loader: "absolute z-10 top-0 bottom-0 left-0 right-0 flex items-center justify-center",
  },
  variants: {
    color: {
      primary: {
        base: "bg-primary border-primary",
      },
      secondary: {
        base: "border-secondary bg-secondary",
      },
    },
    size: {
      sm: {
        base: "px-2 py-1",
        text: "text-sm",
      },
      md: {
        base: "px-4 py-2.5",
        text: "text-md",
      },
      lg: {
        base: "px-6 py-3",
        text: "text-lg",
      },
      xl: {
        base: "px-8 py-4",
        text: "text-xl",
      },
      "2xl": {
        base: "px-10 py-5",
        text: "text-2xl",
      },
      "3xl": {
        base: "px-12 py-6",
        text: "text-3xl",
      },
    },
    type: {
      solid: {
        text: "text-white",
      },
      outline: {
        base: "bg-transparent",
      },
      flat: {
        base: "bg-transparent border-transparent",
      },
    },
    roundness: {
      none: {
        base: "rounded-none",
      },
      sm: {
        base: "rounded-sm",
      },
      md: {
        base: "rounded-md",
      },
      lg: {
        base: "rounded-lg",
      },
      xl: {
        base: "rounded-xl",
      },
    },
    loading: {
      true: {
        text: "text-transparent",
      },
    },
  },
  defaultVariants: {
    color: "primary",
    type: "solid",
    size: "md",
    roundness: "md",
  },
  compoundVariants: [
    {
      type: "outline",
      color: "primary",
      loading: false,
      class: {
        text: "text-primary",
      },
    },
    {
      type: "outline",
      color: "secondary",
      loading: false,
      class: {
        text: "text-secondary",
      },
    },
    {
      type: "flat",
      color: "primary",
      loading: false,
      class: {
        text: "text-primary",
      },
    },
    {
      type: "flat",
      color: "secondary",
      loading: false,
      class: {
        text: "text-secondary",
      },
    },
  ],
})

interface ButtonProps extends TouchableOpacityProps, VariantProps<typeof buttonVariants> {
  text?: string
  textClassName?: string
  loading?: boolean
  loaderColor?: string
}

export const Button: React.FC<ButtonProps> = ({
  loading,
  disabled,
  children,
  text,
  textClassName,
  color = "primary",
  type = "solid",
  size = "md",
  roundness = "md",
  loaderColor,
  ...props
}) => {
  const {
    base,
    text: textClasses,
    loader,
  } = buttonVariants({ color, type, size, roundness, loading })

  return (
    <TouchableOpacity
      {...props}
      className={base()}
      disabled={disabled ?? loading}
      activeOpacity={0.8}
    >
      {loading && (
        <View className={loader()}>
          <ActivityIndicator
            color={loaderColor ? loaderColor : getLoaderColor({ color, type })}
            size={size === "sm" || size === "md" ? "small" : "large"}
          />
        </View>
      )}
      {text && <Text className={twMerge(textClasses(), textClassName)}>{text}</Text>}
      {children}
    </TouchableOpacity>
  )
}

const getLoaderColor = ({ color = "primary", type = "solid" }: ButtonProps): string => {
  let loaderColor = ""
  if (color === "primary" && type === "solid") loaderColor = tailwindColors.white
  else if (color === "primary" && type === "outline") loaderColor = colors.primary
  else if (color === "secondary" && type === "solid") loaderColor = tailwindColors.white
  else if (color === "secondary" && type === "outline") loaderColor = colors.secondary
  else loaderColor = tailwindColors.gray[400]

  return loaderColor
}
