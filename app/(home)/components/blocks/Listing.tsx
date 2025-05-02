import { cookies } from "next/headers"
import { IJobApplication } from "@/modules/jobs/domain/entities/job.entity"

import { ApplicationStatus } from "@/lib/generated/prisma"
import SearchInput from "@/components/SearchInput"
import TabsFilter from "@/components/TabsFilter"

import Empty from "./Empty"
import { JobCard } from "./JobCard"

async function fetchData({
  status,
  job,
}: {
  job?: string
  status?: ApplicationStatus
  page?: number
}) {
  const token = (await cookies()).get("token")?.value
  const params = new URLSearchParams({
    status: status ?? "",
    job: job ?? "",
  })

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/jobs?${params.toString()}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        Cookie: `token=${token}`,
      },
    }
  )
  const data = await response.json()
  return data
}

export default async function Listing({
  queryParams: { status, job },
}: {
  queryParams: {
    job?: string
    status?: ApplicationStatus
    page?: number
  }
}) {
  const { data } = await fetchData({ status, job })

  return (
    <section className="py-4">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-wrap justify-between gap-2">
          <div className="w-full md:w-72">
            <SearchInput />
          </div>
          <TabsFilter
            paramName="status"
            list={[
              { label: "APPLIED", value: "APPLIED" },
              { label: "INTERVIEW", value: "INTERVIEW" },
              { label: "OFFER", value: "OFFER" },
              { label: "REJECTED", value: "REJECTED" },
              { label: "ACCEPTED", value: "ACCEPTED" },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 gap-3 py-2 sm:grid-cols-2 lg:grid-cols-3">
          {data?.map((job: IJobApplication) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
        {!data.length ? (
          <Empty hasActiveSearch={Object.keys({ status, job }).length > 0} />
        ) : null}
      </div>
    </section>
  )
}
