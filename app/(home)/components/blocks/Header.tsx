"use client"

import Link from "next/link"

import CreateModal from "../modals/CreateModal"

export default function Header() {
  return (
    <header className="bg-gray-50 py-3">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between space-y-2 md:flex-row md:space-y-0">
          <div>
            <Link href="/">
              <h1 className="text-xl font-bold tracking-tight md:text-2xl">
                Job Tracker
              </h1>
            </Link>
          </div>
          <CreateModal />
        </div>
      </div>
    </header>
  )
}
