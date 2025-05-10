import { Metadata } from "next"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import { IJobApplication } from "@/modules/jobs/domain/entities/job.entity"

import Header from "../components/blocks/Header"
import { JobDetailsCard } from "./components/JobDetails"

export const revalidate = 60 * 60 * 24
export async function generateMetadata({
  params: { id },
}: {
  params: { id: string }
}): Promise<Metadata> {
  const job = await fetchData({ id })
  if (!job) {
    return {
      title: "Job NotFound",
    }
  }
  return {
    title: `${job.position} ${job.company}`,
  }
}

async function fetchData({ id }: { id: string }): Promise<IJobApplication> {
  const token = (await cookies()).get("token")?.value

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${id}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        Cookie: `token=${token}`,
      },
      next: { revalidate: 3600 * 24 },
    }
  )

  if (!response.ok) {
    const errorBody = await response.json()
    if (response.status === 404) {
      notFound()
    } else {
      // need more enhancement to handel all other status codes
      throw new Error(errorBody.message)
    }
  }
  const data = await response.json()
  return data.data
}

export default async function JobDetails({
  params: { id },
}: {
  params: { id: string }
}) {
  const job = await fetchData({ id })
  return (
    <section>
      <Header />
      <div className="mx-auto h-full max-w-6xl px-4 pt-4">
        <JobDetailsCard job={job} />
      </div>
    </section>
  )
}
