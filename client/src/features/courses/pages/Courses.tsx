import { useState, useMemo, useEffect, useRef, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { useCourses } from "../hooks/useCoursesApi"

import { CourseSearch } from "../components/CourseSearch"
import { CategoryFilter } from "../components/CategoryFilter"
import { CourseSortDropdown, type SortOption } from "../components/CourseSortDropdown"
import { CreateCourseModal } from "../components/CreateCourseModal"
import { CreateCourseButton } from "../components/CreateCourseButton"
import CourseGrid from "../components/CourseGrid"
import { PendingCourseCard } from "../components/PendingCourseCard"
import type { Category, Course } from "../types"
import { socket } from "../../../utils/socket"

export function Courses() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [sortOption, setSortOption] = useState<SortOption>({
    value: "newest",
    label: "Newest First",
    field: "createdAt",
    order: "desc",
  })
  const [showCreateModal, setShowCreateModal] = useState(false)

  const {
    data: coursesResponse,
    isLoading: coursesLoading,
    error: coursesError,
    refetch: refetchCourses,
  } = useCourses()

  const courses = coursesResponse?.data ?? []
  const categories: Category[] = []
  const categoriesLoading = false
  const socketIdRef = useRef<string>("")

  // Map of youtubeUrl → thumbnail (captured from videoInfo at submit time)
  const [pendingCourses, setPendingCourses] = useState<
    Map<string, { thumbnail: string; title: string }>
  >(new Map())

  const handleCoursePending = useCallback(
    (youtubeUrl: string, info: { thumbnail: string; title: string }) => {
      setPendingCourses((prev) => {
        const next = new Map(prev)
        next.set(youtubeUrl, info)
        return next
      })
    },
    []
  )

  useEffect(() => {
    socket.on("connect", () => {
      socketIdRef.current = socket.id as string
      console.log("✅ Connected with id:", socket.id)
    })
    socket.on("courseCreated", (data) => {
      console.log("📌 Course created:", data.course)
      // Remove ghost card now that the real card will appear after refetch
      if (data.course?.youtubeUrl) {
        setPendingCourses((prev) => {
          const next = new Map(prev)
          next.delete(data.course.youtubeUrl)
          return next
        })
      }
      refetchCourses()
    })

    return () => {
      socket.off("connect")
      socket.off("courseCreated")
    }
  }, [])

  const filteredAndSortedCourses = useMemo(() => {
    let filtered = courses as Course[]

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(query) ||
          course.channel.toLowerCase().includes(query) ||
          course.description?.toLowerCase().includes(query),
      )
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((course) => selectedCategories.includes(course.categoryId))
    }

    const sorted = [...filtered].sort((a, b) => {
      const { field, order } = sortOption

      let aValue: any = a[field]
      let bValue: any = b[field]

      if (field === "createdAt") {
        aValue = new Date(aValue || 0).getTime()
        bValue = new Date(bValue || 0).getTime()
      } else if (field === "progress") {
        aValue = aValue || 0
        bValue = bValue || 0
      } else if (field === "title") {
        aValue = aValue?.toLowerCase() || ""
        bValue = bValue?.toLowerCase() || ""
      }

      if (order === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    return sorted
  }, [courses, searchQuery, selectedCategories, sortOption])

  const handleCourseClick = (course: Course) => {
    navigate(`/courses/${course._id}`)
  }

  const handleCreateCategory = () => {
    setShowCreateModal(true)
  }

  const isLoading = coursesLoading || categoriesLoading

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-[var(--font-size-3xl)] font-bold text-[var(--color-text-primary)] mb-2">My Courses</h1>
          <p className="text-[var(--color-text-secondary)]">Manage and track your learning progress</p>
        </div>

        <CreateCourseButton onClick={() => setShowCreateModal(true)} disabled={isLoading} />
      </div>

      <div className="mb-8 flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center flex-1">
          <div className="w-full sm:max-w-md">
            <CourseSearch onSearch={setSearchQuery} placeholder="Search courses..." initialValue={searchQuery} />
          </div>

          <CategoryFilter
            categories={categories}
            selectedCategories={selectedCategories}
            onCategoryChange={setSelectedCategories}
            onCreateCategory={handleCreateCategory}
            isLoading={categoriesLoading}
          />
        </div>

        <CourseSortDropdown selectedSort={sortOption} onSortChange={setSortOption} />
      </div>

      {/* Ghost pending cards appear at the top of the grid, before real courses */}
      {pendingCourses.size > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
          {Array.from(pendingCourses.entries()).map(([url, info]) => (
            <PendingCourseCard key={url} thumbnail={info.thumbnail} title={info.title} />
          ))}
        </div>
      )}

      <CourseGrid
        courses={filteredAndSortedCourses}
        isLoading={isLoading}
        error={coursesError?.message || null}
        onCourseClick={handleCourseClick}
        emptyMessage={
          searchQuery || selectedCategories.length > 0
            ? "No courses match your filters"
            : pendingCourses.size > 0
              ? "Your first course is being created above…"
              : "No courses found. Create your first course to get started!"
        }
        onRetry={refetchCourses}
      />

      <CreateCourseModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        categories={categories}
        socketIdRef={socketIdRef}
        onPending={handleCoursePending}
      />
    </div>
  )
}
