import type { Metadata } from "next"

import "./globals.css"

import { Poppins } from "next/font/google"
import { NuqsAdapter } from "nuqs/adapters/next/app"

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
        <NuqsAdapter>{children}</NuqsAdapter>
      </body>
    </html>
  )
}
