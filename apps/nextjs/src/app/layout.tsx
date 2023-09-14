import type { Metadata } from "next"
import { Comfortaa } from "next/font/google"
import type { Session } from "@supabase/auth-helpers-nextjs"

import "~/styles/globals.css"

import { AppProviders } from "./providers"

const fontComfortaa = Comfortaa({
  subsets: ["latin-ext"],
  variable: "--font-comfortaa",
})

export const metadata: Metadata = {
  title: "IdeaSphere",
  description: "Brak pomysłu na spędzenie wolnego czasu? Spróbuj IdeaSphere!",
  openGraph: {
    title: "IdeaSphere",
    description: "Brak pomysłu na spędzenie wolnego czasu? Spróbuj IdeaSphere!",
    url: "ideasphere.buzuk.dev",
    siteName: "IdeaSphere",
  },
}

export default function Layout(props: { children: React.ReactNode; initialSession: Session }) {
  return (
    <html lang="pl">
      <body className={["font-sans", fontComfortaa.variable].join(" ")}>
        <AppProviders initialSession={props.initialSession}>{props.children}</AppProviders>
      </body>
    </html>
  )
}
