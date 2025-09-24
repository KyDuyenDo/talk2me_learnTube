import { useEffect, useRef, useState, type FunctionComponent } from "react"
import type { Category } from "../../../store/courseStore"
import { CheckIcon, ChevronDown, PlusIcon } from "../../../utils/constant/icon"

interface CategoryFilterProps {
  categories: Category[]
  selectedCategories: string[]
  onCategoryChange: (categoryIds: string[]) => void
  onCreateCategory?: () => void
  isLoading?: boolean
}

export const CategoryFilter: FunctionComponent<CategoryFilterProps> = ({
  categories,
  selectedCategories,
  onCategoryChange,
  onCreateCategory,
  isLoading = false,
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

  const handleCategoryToggle = (categoryId: string) => {
    const isSelected = selectedCategories.includes(categoryId)
    if (isSelected) {
      onCategoryChange(selectedCategories.filter((id) => id !== categoryId))
    } else {
      onCategoryChange([...selectedCategories, categoryId])
    }
  }

  const selectedCategoryNames = categories.filter((cat) => selectedCategories.includes(cat.id)).map((cat) => cat.name)

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setShowDropDown(!showDropDown)}
        disabled={isLoading}
        className="flex items-center justify-between w-full min-w-[200px] px-[var(--spacing-md)] py-[var(--spacing-sm)] border-[var(--border-width-normal)] border-[var(--color-border)] rounded-[var(--border-radius-md)] bg-[var(--color-background)] text-[var(--color-text-primary)] hover:border-[var(--color-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <div className="flex items-center gap-2">
          <span className="font-medium">Categories</span>
          {selectedCategoryNames.length > 0 && (
            <div className="flex gap-1">
              {selectedCategoryNames.slice(0, 2).map((name, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-[var(--font-size-xs)] bg-[var(--color-primary)] text-white rounded-[var(--border-radius-sm)]"
                >
                  {name}
                </span>
              ))}
              {selectedCategoryNames.length > 2 && (
                <span className="px-2 py-1 text-[var(--font-size-xs)] bg-[var(--color-text-muted)] text-white rounded-[var(--border-radius-sm)]">
                  +{selectedCategoryNames.length - 2}
                </span>
              )}
            </div>
          )}
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform ${showDropDown ? "rotate-180" : ""}`} />
      </button>

      {showDropDown && (
        <div className="absolute z-50 top-full mt-1 w-full min-w-[280px] max-h-[320px] overflow-auto bg-[var(--color-background)] border-[var(--border-width-normal)] border-[var(--color-border)] rounded-[var(--border-radius-md)] shadow-[var(--shadow-lg)]">
          <div className="p-2">
            {onCreateCategory && (
              <>
                <button
                  onClick={() => {
                    onCreateCategory()
                    setShowDropDown(false)
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-[var(--font-size-sm)] text-[var(--color-primary)] hover:bg-[var(--color-surface)] rounded-[var(--border-radius-sm)] transition-colors"
                >
                  <PlusIcon className="w-4 h-4" />
                  Create New Category
                </button>
                <div className="h-px bg-[var(--color-border)] my-2" />
              </>
            )}

            {categories.length === 0 ? (
              <div className="px-3 py-4 text-center text-[var(--color-text-muted)]">
                <p>No categories available</p>
                {onCreateCategory && (
                  <p className="text-[var(--font-size-xs)] mt-1">Create your first category to get started</p>
                )}
              </div>
            ) : (
              <div className="space-y-1">
                {categories.map((category) => {
                  const isSelected = selectedCategories.includes(category.id)

                  return (
                    <label
                      key={category.id}
                      className="flex items-center justify-between px-3 py-2 hover:bg-[var(--color-surface)] rounded-[var(--border-radius-sm)] cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleCategoryToggle(category.id)}
                            className="w-4 h-4 appearance-none border-[var(--border-width-normal)] border-[var(--color-border)] rounded-[var(--border-radius-sm)] checked:bg-[var(--color-primary)] checked:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-1"
                          />
                          {isSelected && (
                            <CheckIcon className="absolute top-0 left-0 w-4 h-4 text-white pointer-events-none" />
                          )}
                        </div>
                        <span className="text-[var(--font-size-sm)] text-[var(--color-text-primary)]">
                          {category.name}
                        </span>
                      </div>
                      {category.courseCount !== undefined && (
                        <span className="text-[var(--font-size-xs)] text-[var(--color-text-muted)] bg-[var(--color-surface)] px-2 py-1 rounded-[var(--border-radius-sm)]">
                          {category.courseCount}
                        </span>
                      )}
                    </label>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default CategoryFilter
