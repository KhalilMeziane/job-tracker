import {
  createLoader,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
  type SearchParams,
} from "nuqs/server"

import { ApplicationStatus } from "@/lib/generated/prisma"

import Header from "./components/blocks/Header"
import Listing from "./components/blocks/Listing"

type PageProps = {
  searchParams: Promise<SearchParams>
}

export default async function Home({ searchParams }: PageProps) {
  const queryParams = await createLoader({
    job: parseAsString.withDefault(""),
    status: parseAsStringEnum<ApplicationStatus>(
      Object.values(ApplicationStatus)
    ).withDefault(ApplicationStatus.APPLIED),
    page: parseAsInteger.withDefault(1),
  })(searchParams)
  return (
    <>
      <Header />
      <Listing queryParams={queryParams} />
    </>
  )
}
