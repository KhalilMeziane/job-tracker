import { cookies } from "next/headers"
import { GetJobsParamsDTO } from "@/modules/jobs/application/dtos/GetJobsParamsDTO"
import { IJobApplication } from "@/modules/jobs/domain/entities/job.entity"

import { PaginationWithLinks } from "@/components/ui/pagination-with-links"
import SearchInput from "@/components/SearchInput"
import TabsFilter from "@/components/TabsFilter"

import Empty from "./Empty"
import { JobCard } from "./JobCard"

async function fetchData({ status, job, page }: GetJobsParamsDTO) {
  const token = (await cookies()).get("token")?.value
  const params = new URLSearchParams({
    status: status ?? "",
    job: job ?? "",
    page: page.toString(),
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
  queryParams: { status, job, page },
}: {
  queryParams: GetJobsParamsDTO
}) {
  const {
    data: { jobs, totalCount },
  } = await fetchData({ status, job, page })

  return (
    <section className="h-[85vh] py-4">
      <div className="mx-auto h-full max-w-6xl px-4">
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

        <div className="flex h-full flex-col">
          <div className="grow">
            <div className="grid grid-cols-1 gap-3 py-2 sm:grid-cols-2 lg:grid-cols-3">
              {jobs?.map((job: IJobApplication) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
            {!jobs.length ? (
              <Empty
                hasActiveSearch={Object.keys({ status, job }).length > 0}
              />
            ) : null}
          </div>

          {totalCount > 0 && (
            <PaginationWithLinks
              totalCount={totalCount}
              pageSize={10}
              page={page}
            />
          )}
        </div>
      </div>
    </section>
  )
}
