"use client"

import type { FunctionComponent } from "react"
import type { Course } from "../../../store/courseStore"

interface CourseCardProps {
  course: Course
  onClick?: () => void
}

export const CourseCard: FunctionComponent<CourseCardProps> = ({ course, onClick }) => {
  const progressPercentage = course.progress || 0
  const isCompleted = course.isCompleted || progressPercentage >= 100

  return (
    <div className="bg-[var(--color-background)] rounded-[var(--border-radius-lg)] border-[var(--border-width-normal)] border-[var(--color-border)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-lg)] transition-all duration-300 overflow-hidden group cursor-pointer">
      <div className="flex flex-col h-full">
        <div className="p-4 pb-0">
          <div className="relative aspect-video overflow-hidden rounded-[var(--border-radius-md)] bg-gradient-to-br from-gray-100 to-gray-200">
            <img
              src={course.thumbnail || "/placeholder.svg?height=180&width=320&query=video thumbnail"}
              alt={course.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

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

            {progressPercentage > 0 && (
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/20 backdrop-blur-sm">
                <div
                  className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary)]/80 transition-all duration-500 ease-out rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            )}

            {isCompleted && (
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
          <h3 className="font-semibold text-[var(--color-text-primary)] line-clamp-2 leading-tight text-base group-hover:text-[var(--color-primary)] transition-colors duration-200">
            {course.title}
          </h3>

          <div className="flex items-center justify-between text-sm text-[var(--color-text-muted)] mt-auto">
            <div className="flex items-center gap-2">
              {course.channel && (
                <div className="flex items-center gap-2 bg-[var(--color-background)] rounded-full px-2 py-1 border border-[var(--color-border)]">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="font-medium text-xs">{course.channel}</span>
                </div>
              )}
            </div>

            {progressPercentage > 0 && !isCompleted && (
              <div className="text-xs font-medium text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-2 py-1 rounded-full">
                {Math.round(progressPercentage)}%
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseCard
