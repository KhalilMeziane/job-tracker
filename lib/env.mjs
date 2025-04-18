import { z } from "zod"

const envSchema = z.object({
  DATABASE_URL: z.string({ required_error: "DATABASE_URL is required" }).url(),
})

const parsedEnv = envSchema.safeParse(process.env)

if (!parsedEnv.success) {
  console.error("\n🚨 Environment Variable Validation Failed!\n")
  console.error("❌ Errors:", parsedEnv.error.format())
  throw new Error(
    "❌ Invalid environment variables. Please check your .env file."
  )
}

export const env = parsedEnv.data
