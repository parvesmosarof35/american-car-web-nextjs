"use client"

import { Search } from "lucide-react"
import { useRouter } from "next/navigation"
import type { ChangeEvent } from "react"

interface SearchInputProps {
  placeholder?: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  className?: string
}

export default function SearchInput({
  placeholder = "Search plates...",
  value,
  onChange,
  className = "",
}: SearchInputProps) {
  const router = useRouter()

  const handleSearch = () => {
    if (value.trim()) {
      router.push(`/all-plates?search=${encodeURIComponent(value)}`)
    }
  }

  return (
    <div className="flex w-full">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`flex-1 px-5 py-3 border border-t-2 border-b-2 border-l-2 focus:border-r-0 border-gray-600 rounded-l-md text-center font-medium text-gray-700 focus:outline-none placeholder:text-gray-700 placeholder:font-bold ${className}`}
      />

      <button
        type="submit"
        onClick={handleSearch}
        className="bg-[#00823A] hover:bg-green-700 text-white px-6 py-3 rounded-r-md transition-colors duration-200 flex items-center justify-center"
        aria-label="Search"
      >
        <Search className="w-5 h-5" />
      </button>
    </div>
  )
}
