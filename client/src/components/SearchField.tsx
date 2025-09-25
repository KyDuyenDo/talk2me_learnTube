import type * as React from "react"

interface SearchProps extends React.ComponentProps<"input"> {
  onSearch?: (value: string) => void
}

const SearchIcon = () => (
  <svg
    className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
    />
  </svg>
)

function Search({ className, onSearch, onChange, ...props }: SearchProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e)
    onSearch?.(e.target.value)
  }

  const inputClasses = [
    "flex h-9 w-full min-w-0 rounded-md border-2 border-gray-300 bg-transparent pl-9 pr-3 py-1 text-base transition-colors outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
    "placeholder:text-gray-500",
    "focus:border-gray-300",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <div className="relative">
      <SearchIcon />
      <input type="text" className={inputClasses} placeholder="Search" onChange={handleChange} {...props} />
    </div>
  )
}

export { Search }
