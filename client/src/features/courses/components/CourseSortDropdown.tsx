import { useEffect, useRef, useState, type FunctionComponent } from "react"
import { ChevronDown } from "../../../utils/constant/icon"

export type SortOption = {
  value: string
  label: string
  field: "createdAt" | "title" | "progress"
  order: "asc" | "desc"
}

interface CourseSortDropdownProps {
  selectedSort: SortOption
  onSortChange: (sort: SortOption) => void
  options?: SortOption[]
}

const defaultSortOptions: SortOption[] = [
  { value: "newest", label: "Newest First", field: "createdAt", order: "desc" },
  { value: "oldest", label: "Oldest First", field: "createdAt", order: "asc" },
  { value: "title-asc", label: "Title A-Z", field: "title", order: "asc" },
  { value: "title-desc", label: "Title Z-A", field: "title", order: "desc" },
  { value: "progress-desc", label: "Most Progress", field: "progress", order: "desc" },
  { value: "progress-asc", label: "Least Progress", field: "progress", order: "asc" },
]

export const CourseSortDropdown: FunctionComponent<CourseSortDropdownProps> = ({
  selectedSort,
  onSortChange,
  options = defaultSortOptions,
}) => {
  const [showDropDown, setShowDropDown] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowDropDown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSortSelect = (option: SortOption) => {
    onSortChange(option)
    setShowDropDown(false)
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setShowDropDown(!showDropDown)}
        className="flex items-center gap-2 px-[var(--spacing-md)] py-[var(--spacing-sm)] [border-width:var(--border-width-normal)] [border-color:var(--color-border)] rounded-[var(--border-radius-md)] bg-[var(--color-background)] text-[var(--color-text-primary)] hover:border-[var(--color-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-colors"
      >
        {selectedSort.order === "asc" ? <div>🔼</div> : <div>🔽</div>}
        <span className="text-[length:var(--font-size-sm)] font-medium">{selectedSort.label}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${showDropDown ? "rotate-180" : ""}`}/>
      </button>

      {showDropDown && (
        <div className="absolute z-50 top-full mt-1 right-0 w-48 bg-[var(--color-background)] [border-width:var(--border-width-normal)] [border-color:var(--color-border)] rounded-[var(--border-radius-md)] shadow-[var(--shadow-lg)] overflow-hidden">
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSortSelect(option)}
                className={`w-full flex items-center gap-3 px-4 py-2 text-left text-[length:var(--font-size-sm)] hover:bg-[var(--color-surface)] transition-colors ${
                  selectedSort.value === option.value
                    ? "bg-[var(--color-surface)] text-[var(--color-primary)]"
                    : "text-[var(--color-text-primary)]"
                }`}
              >
                {option.order === "asc" ? <div>🔼</div> : <div>🔽</div>}
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default CourseSortDropdown
