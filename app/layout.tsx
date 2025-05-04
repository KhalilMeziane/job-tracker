import type { Metadata } from "next"

import "./globals.css"

import { Poppins } from "next/font/google"
import NuqsAdapterProvider from "@/providers/NuqsAdapter"
import TanstackQuery from "@/providers/TanstackQuery"

import { Toaster } from "@/components/ui/toaster"

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    template: `%s | Job Tracker`,
    default: "Job Tracker",
  },
  description: "Job Tracker app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <TanstackQuery>
          <NuqsAdapterProvider>{children}</NuqsAdapterProvider>
          <Toaster />
        </TanstackQuery>
      </body>
    </html>
  )
}
