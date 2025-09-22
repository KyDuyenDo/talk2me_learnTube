import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

export interface Course {
  id: string
  title: string
  description?: string
  youtubeUrl: string
  thumbnail: string
  channel: string
  categoryId: string
  userId: string
  createdAt: string
  updatedAt: string
  isCompleted?: boolean
  progress?: number
}

export interface Category {
  id: string
  name: string
  userId: string
  createdAt: string
  courseCount?: number
}

interface CourseState {
  // Data
  courses: Course[]
  categories: Category[]
  selectedCourse: Course | null
  selectedCategory: string | null

  // UI State
  isLoading: boolean
  error: string | null
  isCreateModalOpen: boolean

  // Actions
  setCourses: (courses: Course[]) => void
  setCategories: (categories: Category[]) => void
  setSelectedCourse: (course: Course | null) => void
  setSelectedCategory: (categoryId: string | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setCreateModalOpen: (open: boolean) => void

  // Course actions
  addCourse: (course: Course) => void
  updateCourse: (courseId: string, updates: Partial<Course>) => void
  removeCourse: (courseId: string) => void

  // Category actions
  addCategory: (category: Category) => void
  updateCategory: (categoryId: string, updates: Partial<Category>) => void
  removeCategory: (categoryId: string) => void

  // Filters
  getFilteredCourses: () => Course[]
  getCoursesByCategory: (categoryId: string) => Course[]
}

export const useCourseStore = create<CourseState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        courses: [],
        categories: [],
        selectedCourse: null,
        selectedCategory: null,
        isLoading: false,
        error: null,
        isCreateModalOpen: false,

        // Basic setters
        setCourses: (courses) => set({ courses }),
        setCategories: (categories) => set({ categories }),
        setSelectedCourse: (course) => set({ selectedCourse: course }),
        setSelectedCategory: (categoryId) => set({ selectedCategory: categoryId }),
        setLoading: (loading) => set({ isLoading: loading }),
        setError: (error) => set({ error }),
        setCreateModalOpen: (open) => set({ isCreateModalOpen: open }),

        // Course actions
        addCourse: (course) =>
          set((state) => ({
            courses: [...state.courses, course],
          })),

        updateCourse: (courseId, updates) =>
          set((state) => ({
            courses: state.courses.map((course) => (course.id === courseId ? { ...course, ...updates } : course)),
          })),

        removeCourse: (courseId) =>
          set((state) => ({
            courses: state.courses.filter((course) => course.id !== courseId),
          })),

        // Category actions
        addCategory: (category) =>
          set((state) => ({
            categories: [...state.categories, category],
          })),

        updateCategory: (categoryId, updates) =>
          set((state) => ({
            categories: state.categories.map((category) =>
              category.id === categoryId ? { ...category, ...updates } : category,
            ),
          })),

        removeCategory: (categoryId) =>
          set((state) => ({
            categories: state.categories.filter((category) => category.id !== categoryId),
          })),

        // Computed values
        getFilteredCourses: () => {
          const { courses, selectedCategory } = get()
          if (!selectedCategory) return courses
          return courses.filter((course) => course.categoryId === selectedCategory)
        },

        getCoursesByCategory: (categoryId) => {
          const { courses } = get()
          return courses.filter((course) => course.categoryId === categoryId)
        },
      }),
      {
        name: "course-storage",
        partialize: (state) => ({
          courses: state.courses,
          categories: state.categories,
          selectedCategory: state.selectedCategory,
        }),
      },
    ),
    { name: "CourseStore" },
  ),
)
