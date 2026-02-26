import type { FunctionComponent } from "react"
import type { Course } from "../types"


interface CourseCardProps {
  course: Course
  onClick?: () => void
  isPending?: boolean
}

export const CourseCard: FunctionComponent<CourseCardProps> = ({ course, onClick, isPending = false }) => {
  const progressPercentage = course.progress || 0
  const isCompleted = course.isCompleted || progressPercentage >= 100

  return (
    <div
      className={`bg-[var(--color-background)] rounded-[var(--border-radius-lg)] border [border-color:var(--color-border)] shadow-[var(--shadow-sm)] transition-all duration-300 overflow-hidden group ${isPending ? "cursor-not-allowed opacity-80" : "hover:shadow-[var(--shadow-lg)] cursor-pointer"
        }`}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 pb-0">
          <div className="relative aspect-video overflow-hidden rounded-[var(--border-radius-md)] bg-gradient-to-br from-gray-100 to-gray-200">
            <img
              src={course.thumbnail || "/placeholder.svg?height=180&width=320&query=video thumbnail"}
              alt={course.title}
              className={`w-full h-full object-cover transition-all duration-300 ${isPending ? "brightness-50 scale-105" : "group-hover:scale-105"
                }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

            {/* Pending overlay */}
            {isPending ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px]">
                <div className="flex flex-col items-center gap-2">
                  {/* Spinner */}
                  <svg
                    className="animate-spin w-9 h-9 text-white drop-shadow-lg"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                    <path
                      className="opacity-80"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  <span className="text-white text-xs font-semibold tracking-wide drop-shadow">Creating course…</span>
                </div>
              </div>
            ) : (
              <button
                onClick={onClick}
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/20 backdrop-blur-sm"
              >
                <div className="bg-[var(--color-primary)] rounded-full p-4 shadow-2xl transform scale-90 group-hover:scale-100 transition-transform duration-200">
                  <div className="w-6 h-6 text-white ml-0.5 flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </button>
            )}

            {progressPercentage > 0 && !isPending && (
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/20 backdrop-blur-sm">
                <div
                  className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary)]/80 transition-all duration-500 ease-out rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            )}

            {isCompleted && !isPending && (
              <div className="absolute top-3 right-3">
                <div className="bg-[var(--color-success)] rounded-full p-1.5 shadow-lg ring-2 ring-white/20">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="p-4 space-y-3 flex-1 flex flex-col">
          <h3 className={`font-semibold line-clamp-2 leading-tight text-base transition-colors duration-200 ${isPending
              ? "text-[var(--color-text-muted)]"
              : "text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)]"
            }`}>
            {course.title}
          </h3>

          <div className="flex items-center justify-between text-sm text-[var(--color-text-muted)] mt-auto">
            <div className="flex items-center gap-2">
              {course.channel && (
                <div className="flex items-center gap-2 bg-[var(--color-background)] rounded-full px-2 py-1 border border-[var(--color-border)]">
                  <div className={`w-2 h-2 rounded-full ${isPending ? "bg-amber-400 animate-pulse" : "bg-emerald-500 animate-pulse"
                    }`} />
                  <span className="font-medium text-xs">{course.channel}</span>
                </div>
              )}
            </div>

            {isPending ? (
              <div className="text-xs font-medium text-amber-500 bg-amber-50 px-2 py-1 rounded-full border border-amber-200 animate-pulse">
                Processing…
              </div>
            ) : progressPercentage > 0 && !isCompleted ? (
              <div className="text-xs font-medium text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-2 py-1 rounded-full">
                {Math.round(progressPercentage)}%
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseCard
