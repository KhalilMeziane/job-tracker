import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="w-full text-center lg:w-1/2">
        <h2 className="text-4xl">Not Found Page</h2>
        <p className="my-1 text-gray-800">Could not find requested resource</p>
        <Link href="/" className="underline">
          Return Home
        </Link>
      </div>
    </div>
  )
}
