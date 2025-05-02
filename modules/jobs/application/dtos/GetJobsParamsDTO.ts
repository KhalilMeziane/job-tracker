import { ApplicationStatus } from "@/lib/generated/prisma"

export interface GetJobsParamsDTO {
  status: ApplicationStatus
  job: string
  page: number
}
