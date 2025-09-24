import type { FunctionComponent } from "react"
import type { Course } from "../../../store/courseStore"

interface CourseCardProps {
  course: Course
  onClick?: () => void
}

export const CourseCard: FunctionComponent<CourseCardProps> = ({
  course,
  onClick,
}) => {
  const progressPercentage = course.progress || 0
  const isCompleted = course.isCompleted || progressPercentage >= 100

  return (
    <div className="bg-[var(--color-background)] rounded-[var(--border-radius-lg)] border-[var(--border-width-normal)] border-[var(--color-border)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-all duration-200 overflow-hidden group">
      <div className="flex flex-col">
        {/* Thumbnail Section */}
        <div className="p-3 pb-0">
          <div className="relative aspect-video overflow-hidden rounded-[var(--border-radius-md)]">
            <img
              src={course.thumbnail || "/placeholder.svg?height=180&width=320&query=video thumbnail"}
              alt={course.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />

            {/* Play Button Overlay */}
            <button
              onClick={onClick}
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/40"
            >
              <div className="bg-[var(--color-primary)] rounded-full p-3 shadow-lg">
                {/* <PlayIcon className="w-6 h-6 text-white ml-1" /> */}
                <div className="w-6 h-6 text-white ml-1">▶</div>
              </div>
            </button>

            {/* Progress Bar */}
            {progressPercentage > 0 && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30">
                <div
                  className="h-full bg-[var(--color-primary)] transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            )}

            {/* Completion Badge */}
            {isCompleted && (
              <div className="absolute top-2 right-2">
                <div className="bg-[var(--color-success)] rounded-full p-1">
                  {/* <CheckCircleIcon className="w-4 h-4 text-white" /> */}
                  <div className="w-4 h-4 text-white">✓</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-3 space-y-2 flex-1">
          <h3 className="font-medium text-[var(--color-text-primary)] line-clamp-2 leading-snug text-[var(--font-size-sm)]">
            {course.title}
          </h3>
          <p className="text-[var(--font-size-xs)] text-[var(--color-text-secondary)]">{course.channel}</p>

          {/* Progress Info */}
          <div className="flex items-center justify-between text-[var(--font-size-xs)] text-[var(--color-text-muted)]">
            <div className="flex items-center gap-1">
              {/* <ClockIcon className="w-3 h-3" /> */}
              <div className="w-3 h-3">🕒</div>
              <span>{isCompleted ? "Completed" : `${progressPercentage}% complete`}</span>
            </div>
            {course.createdAt && <span>{new Date(course.createdAt).toLocaleDateString()}</span>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseCard
