"use client"

import type React from "react"

import { useState } from "react"
import { CourseCard } from "./CourseCard"
import { Pagination } from "./Pagination"

interface Course {
  id: string
  title: string
  channel: string
  thumbnail: string
  videoUrl: string
  category: string
}

interface CourseFolderProps {
  title: string
  courses: Course[]
  defaultExpanded?: boolean
  itemsPerPage?: number
}

const ChevronDown = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
)

const ChevronRight = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

const Folder = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
    />
  </svg>
)

const Button = ({
  children,
  onClick,
  variant = "default",
  className = "",
}: {
  children: React.ReactNode
  onClick?: () => void
  variant?: "default" | "ghost"
  className?: string
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
  const variantClasses =
    variant === "ghost"
      ? "hover:bg-accent hover:text-accent-foreground"
      : "bg-primary text-primary-foreground hover:bg-primary/90"

  return (
    <button className={`${baseClasses} ${variantClasses} ${className}`} onClick={onClick}>
      {children}
    </button>
  )
}

export function CourseFolder({ title, courses, defaultExpanded = false, itemsPerPage = 6 }: CourseFolderProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(courses.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedCourses = courses.slice(startIndex, startIndex + itemsPerPage)

  const handleCourseClick = (course: Course) => {
    window.open(course.videoUrl, "_blank")
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <Button
        variant="ghost"
        className="w-full p-4 flex items-center justify-between hover:bg-muted/50 h-auto"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          {/* <Folder className="text-primary" /> */}
          <div className="text-left">
            <h3 className="font-semibold text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">
              {courses.length} course{courses.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        {isExpanded ? <ChevronDown /> : <ChevronRight />}
      </Button>

      {isExpanded && (
        <div className="p-6 border-t border-border bg-muted/20">
          {courses.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedCourses.map((course) => (
                  <CourseCard key={course.id} course={course} onClick={() => handleCourseClick(course)} />
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                itemsPerPage={itemsPerPage}
                totalItems={courses.length}
              />
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No courses found in this category</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
