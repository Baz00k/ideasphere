import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { Session } from "@supabase/auth-helpers-nextjs";

import "~/styles/globals.css";

import { AppProviders } from "./providers";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Create T3 Turbo",
  description: "Simple monorepo with shared backend for web & mobile apps",
  openGraph: {
    title: "Create T3 Turbo",
    description: "Simple monorepo with shared backend for web & mobile apps",
    url: "https://create-t3-turbo.vercel.app",
    siteName: "Create T3 Turbo",
  },
};

export default function Layout(props: {
  children: React.ReactNode;
  initialSession: Session;
}) {
  return (
    <html lang="en">
      <body className={["font-sans", fontSans.variable].join(" ")}>
        <AppProviders initialSession={props.initialSession}>
          {props.children}
        </AppProviders>
      </body>
    </html>
  );
}
