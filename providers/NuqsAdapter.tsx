import { ReactNode } from "react"
import { NuqsAdapter } from "nuqs/adapters/next/app"

export default function NuqsAdapterProvider({
  children,
}: {
  children: ReactNode
}) {
  return <NuqsAdapter>{children}</NuqsAdapter>
}
