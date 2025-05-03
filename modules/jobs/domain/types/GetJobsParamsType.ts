import { ApplicationStatus } from "@/lib/generated/prisma"

export interface GetJobsParamsType {
  status: ApplicationStatus
  job: string
  page: number
}
