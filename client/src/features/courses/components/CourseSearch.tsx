import { useState, useEffect, type FunctionComponent } from "react"
import { SearchIcon, Xmark } from "../../../utils/constant/icon"

interface CourseSearchProps {
  onSearch: (query: string) => void
  placeholder?: string
  initialValue?: string
  debounceMs?: number
}

export const CourseSearch: FunctionComponent<CourseSearchProps> = ({
  onSearch,
  placeholder = "Search courses...",
  initialValue = "",
  debounceMs = 300,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialValue)
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(searchQuery)
    }, debounceMs)

    return () => clearTimeout(timeoutId)
  }, [searchQuery, onSearch, debounceMs])

  const handleClear = () => {
    setSearchQuery("")
    onSearch("")
  }

  return (
    <div className="relative">
      <div
        className={`flex items-center px-[var(--spacing-md)] py-[var(--spacing-sm)] [border-width:var(--border-width-normal)] [border-color:var(--color-border)] rounded-[var(--border-radius-md)] bg-[var(--color-background)] transition-colors ${isFocused
          ? "ring-2 ring-[var(--color-primary)] ring-opacity-20"
          : "hover:border-[var(--color-text-secondary)]"
          }`}
      >
        <SearchIcon className="w-4 h-4 text-[var(--color-text-muted)] mr-3" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="flex-1 outline-none bg-transparent text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] text-[length:var(--font-size-sm)]"
        />
        {searchQuery && (
          <button
            onClick={handleClear}
            className="ml-2 p-1 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            <Xmark className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}

export default CourseSearch
