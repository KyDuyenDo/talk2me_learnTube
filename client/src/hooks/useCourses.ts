import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useCourseStore } from "../store/courseStore"
import type { Course, Category } from "../store/courseStore"

// Mock API functions - replace with actual API calls
const courseAPI = {
  getCourses: async (userId: string): Promise<Course[]> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return [
      {
        id: "1",
        title: "React Fundamentals",
        description: "Learn the basics of React",
        youtubeUrl: "https://youtube.com/watch?v=example1",
        thumbnail: "https://img.youtube.com/vi/example1/maxresdefault.jpg",
        channel: "React Channel",
        categoryId: "1",
        userId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isCompleted: false,
        progress: 0,
      },
      {
        id: "2",
        title: "Advanced JavaScript",
        description: "Master JavaScript concepts",
        youtubeUrl: "https://youtube.com/watch?v=example2",
        thumbnail: "https://img.youtube.com/vi/example2/maxresdefault.jpg",
        channel: "JS Masters",
        categoryId: "2",
        userId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isCompleted: true,
        progress: 100,
      },
    ]
  },

  getCategories: async (userId: string): Promise<Category[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return [
      {
        id: "1",
        name: "Frontend Development",
        userId,
        createdAt: new Date().toISOString(),
        courseCount: 5,
      },
      {
        id: "2",
        name: "JavaScript",
        userId,
        createdAt: new Date().toISOString(),
        courseCount: 3,
      },
    ]
  },

  getCourse: async (userId: string, courseId: string): Promise<Course> => {
    await new Promise((resolve) => setTimeout(resolve, 800))
    const courses = await courseAPI.getCourses(userId)
    const course = courses.find((c) => c.id === courseId)
    if (!course) throw new Error("Course not found")
    return course
  },

  createCourse: async (courseData: Omit<Course, "id" | "createdAt" | "updatedAt">): Promise<Course> => {
    await new Promise((resolve) => setTimeout(resolve, 1200))
    return {
      ...courseData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  },

  createCategory: async (categoryData: Omit<Category, "id" | "createdAt">): Promise<Category> => {
    await new Promise((resolve) => setTimeout(resolve, 800))
    return {
      ...categoryData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
  },
}

// Custom hooks
export const useCourses = (userId: string) => {
  const { setCourses, setLoading, setError } = useCourseStore()

  return useQuery({
    queryKey: ["courses", userId],
    queryFn: () => courseAPI.getCourses(userId),
    onSuccess: (data) => {
      setCourses(data)
      setLoading(false)
      setError(null)
    },
    onError: (error: Error) => {
      setError(error.message)
      setLoading(false)
    },
    onLoading: () => setLoading(true),
  })
}

export const useCategories = (userId: string) => {
  const { setCategories, setLoading, setError } = useCourseStore()

  return useQuery({
    queryKey: ["categories", userId],
    queryFn: () => courseAPI.getCategories(userId),
    onSuccess: (data) => {
      setCategories(data)
      setLoading(false)
      setError(null)
    },
    onError: (error: Error) => {
      setError(error.message)
      setLoading(false)
    },
  })
}

export const useCourse = (userId: string, courseId: string) => {
  const { setSelectedCourse, setLoading, setError } = useCourseStore()

  return useQuery({
    queryKey: ["course", userId, courseId],
    queryFn: () => courseAPI.getCourse(userId, courseId),
    enabled: !!courseId,
    onSuccess: (data) => {
      setSelectedCourse(data)
      setLoading(false)
      setError(null)
    },
    onError: (error: Error) => {
      setError(error.message)
      setLoading(false)
    },
  })
}

export const useCreateCourse = () => {
  const queryClient = useQueryClient()
  const { addCourse, setError } = useCourseStore()

  return useMutation({
    mutationFn: courseAPI.createCourse,
    onSuccess: (newCourse) => {
      addCourse(newCourse)
      queryClient.invalidateQueries({ queryKey: ["courses"] })
      setError(null)
    },
    onError: (error: Error) => {
      setError(error.message)
    },
  })
}

export const useCreateCategory = () => {
  const queryClient = useQueryClient()
  const { addCategory, setError } = useCourseStore()

  return useMutation({
    mutationFn: courseAPI.createCategory,
    onSuccess: (newCategory) => {
      addCategory(newCategory)
      queryClient.invalidateQueries({ queryKey: ["categories"] })
      setError(null)
    },
    onError: (error: Error) => {
      setError(error.message)
    },
  })
}
