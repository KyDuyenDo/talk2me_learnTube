import type { FunctionComponent } from "react"
import { CourseCard } from "./CourseCard"
import LoadingSpinner from "../../../components/LoadingSpinner"
import ErrorMessage from "../../../components/ErrorMessage"
import type { Course } from "../../../store/courseStore"

interface CourseGridProps {
  courses: Course[]
  isLoading?: boolean
  error?: string | null
  onCourseClick?: (course: Course) => void
  emptyMessage?: string
  onRetry?: () => void
}

export const CourseGrid: FunctionComponent<CourseGridProps> = ({
  courses,
  isLoading = false,
  error = null,
  onCourseClick,
  emptyMessage = "No courses found",
  onRetry,
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <LoadingSpinner size="lg" className="text-[var(--color-primary)] mb-4" />
          <p className="text-[var(--color-text-secondary)]">Loading courses...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-8">
        <ErrorMessage message={error} onRetry={onRetry} />
      </div>
    )
  }

  if (courses.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 mx-auto mb-4 bg-[var(--color-surface)] rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-[var(--color-text-muted)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 110 2h-1v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6H3a1 1 0 110-2h4zM9 6h6V4H9v2zm0 3v8h2V9H9zm4 0v8h2V9h-2z"
              />
            </svg>
          </div>
          <h3 className="text-[length:var(--font-size-lg)] font-medium text-[var(--color-text-primary)] mb-2">
            {emptyMessage}
          </h3>
          <p className="text-[var(--color-text-secondary)]">
            Start building your learning library by adding your first course.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          onClick={() => onCourseClick?.(course)}
        />
      ))}
    </div>
  )
}

export default CourseGrid
