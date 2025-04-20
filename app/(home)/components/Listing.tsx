import SearchInput from "@/components/SearchInput"
import TabsFilter from "@/components/TabsFilter"

import { Job, JobCard } from "./blocks/JobCard"

const jobs = [
  {
    id: "1",
    company: "Acme Inc",
    position: "Frontend Developer",
    location: "San Francisco, CA",
    status: "applied",
    dateApplied: "2023-04-15",
    notes: "Applied through company website",
    url: "https://acme.com/careers",
  },
  {
    id: "2",
    company: "TechCorp",
    position: "Full Stack Engineer",
    location: "Remote",
    status: "interview",
    dateApplied: "2023-04-10",
    notes: "Phone screen scheduled for next week",
    url: "https://techcorp.com/jobs",
  },
  {
    id: "3",
    company: "Startup XYZ",
    position: "React Developer",
    location: "New York, NY",
    status: "rejected",
    dateApplied: "2023-04-05",
    notes: "Received rejection email",
    url: "https://startupxyz.com/careers",
  },
  {
    id: "4",
    company: "Big Enterprise",
    position: "Software Engineer",
    location: "Chicago, IL",
    status: "offer",
    dateApplied: "2023-03-20",
    notes: "Received offer, considering terms",
    url: "https://bigenterprise.com/jobs",
  },
] as Job[]

export default function Listing() {
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
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </section>
  )
}
