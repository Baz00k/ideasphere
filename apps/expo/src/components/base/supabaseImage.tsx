import { useEffect, useState } from "react"
import { Image } from "expo-image"
import { twMerge } from "tailwind-merge"

import { SUPABASE_IMAGES_BUCKET } from "@ideasphere/consts"

import { supabase } from "~/utils/auth"

interface SupabaseImageProps extends React.ComponentProps<typeof Image> {
  source: string
  preserveRatio?: boolean
}

export const SupabaseImage: React.FC<SupabaseImageProps> = ({
  source,
  preserveRatio,
  className,
  ...props
}) => {
  const [imageUrl, setImageUrl] = useState<string>()
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number }>()

  useEffect(() => {
    const { data } = supabase.storage.from(SUPABASE_IMAGES_BUCKET).getPublicUrl(source)

    setImageUrl(data.publicUrl)
  }, [source])

  return (
    <Image
      source={{ uri: imageUrl }}
      onLoad={(e) => setImageDimensions({ width: e.source.width, height: e.source.height })}
      style={{
        ...(preserveRatio &&
          imageDimensions && {
            aspectRatio: imageDimensions.width / imageDimensions.height,
          }),
      }}
      className={twMerge("h-48 w-48 rounded-md bg-gray-100", className)}
      {...props}
    />
  )
}
