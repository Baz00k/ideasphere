import type { Metadata } from "next"
import { Inter } from "next/font/google"
import type { Session } from "@supabase/auth-helpers-nextjs"

import "~/styles/globals.css"

import { AppProviders } from "./providers"

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "IdeaSphere",
  description: "No idea what to do with your free time? Try IdeaSphere!",
  openGraph: {
    title: "IdeaSphere",
    description: "No idea what to do with your free time? Try IdeaSphere!",
    url: "ideasphere.app",
    siteName: "IdeaSphere",
  },
}

export default function Layout(props: { children: React.ReactNode; initialSession: Session }) {
  return (
    <html lang="pl">
      <body className={["font-sans", fontSans.variable].join(" ")}>
        <AppProviders initialSession={props.initialSession}>{props.children}</AppProviders>
      </body>
    </html>
  )
}
