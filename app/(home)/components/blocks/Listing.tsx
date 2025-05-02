import { IJobApplication } from "@/modules/jobs/domain/entities/job.entity"

import SearchInput from "@/components/SearchInput"
import TabsFilter from "@/components/TabsFilter"

import { JobCard } from "./JobCard"

async function fetchData() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs`)
  const data = await response.json()
  return data
}

export default async function Listing() {
  const { data } = await fetchData()

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
              { label: "all", value: "all" },
              { label: "saved", value: "saved" },
              { label: "applied", value: "applied" },
              { label: "offer", value: "offer" },
              { label: "rejected", value: "rejected" },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 gap-3 py-2 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((job: IJobApplication) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </section>
  )
}
