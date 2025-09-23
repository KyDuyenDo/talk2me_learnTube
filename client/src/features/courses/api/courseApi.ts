import type { Category, Course } from "../../../store/courseStore"
import { api } from "../../../api/utils"


const API_BASE_URL = "http://localhost:3001/api"

// API Response types
interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Course API endpoints
export const courseApi = {
  // Get all courses for a user
  getCourses: async (
    userId: string,
    params?: {
      page?: number
      limit?: number
      categoryId?: string
      search?: string
      sortBy?: "createdAt" | "title" | "progress"
      sortOrder?: "asc" | "desc"
    },
  ): Promise<PaginatedResponse<Course>> => {
    const searchParams = new URLSearchParams()
    searchParams.append("userId", userId)

    if (params?.page) searchParams.append("page", params.page.toString())
    if (params?.limit) searchParams.append("limit", params.limit.toString())
    if (params?.categoryId) searchParams.append("categoryId", params.categoryId)
    if (params?.search) searchParams.append("search", params.search)
    if (params?.sortBy) searchParams.append("sortBy", params.sortBy)
    if (params?.sortOrder) searchParams.append("sortOrder", params.sortOrder)

    const response = await api.get(`/api/course?${searchParams}`)

    if (!response.data.ok) {
      throw new Error(`Failed to fetch courses: ${response.statusText}`)
    }

    const result: ApiResponse<PaginatedResponse<Course>> = await response.data.json()

    if (!result.success || !result.data) {
      throw new Error(result.error || "Failed to fetch courses")
    }

    return result.data
  },

  // Get a specific course
  getCourse: async (userId: string, courseId: string): Promise<Course> => {

    const response = await api.get(`/api/courses/${courseId}?userId=${userId}`)

    if (!response.data.ok) {
      if (response.status === 404) {
        throw new Error("Course not found")
      }
      throw new Error(`Failed to fetch course: ${response.statusText}`)
    }

    const result: ApiResponse<Course> = await response.data.json()

    if (!result.success || !result.data) {
      throw new Error(result.error || "Failed to fetch course")
    }

    return result.data
  },

  // Create a new course
  createCourse: async (courseData: {
    title: string
    description?: string
    youtubeUrl: string
    categoryId: string
    userId: string
  }): Promise<Course> => {

    const response = await api.post(`/api/courses`, JSON.stringify(courseData), {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })

    if (!response.data.ok) {
      const errorData = await response.data.json().catch(() => ({}))
      throw new Error(errorData.error || `Failed to create course: ${response.statusText}`)
    }

    const result: ApiResponse<Course> = await response.data.json()

    if (!result.success || !result.data) {
      throw new Error(result.error || "Failed to create course")
    }

    return result.data
  },

  // Delete a course
  deleteCourse: async (courseId: string, userId: string): Promise<void> => {

    const response = await api.delete(`/api/courses/${courseId}?userId=${userId}`)


    if (!response.data.ok) {
      const errorData = await response.data.json().catch(() => ({}))
      throw new Error(errorData.error || `Failed to delete course: ${response.statusText}`)
    }

    const result: ApiResponse<null> = await response.data.json()

    if (!result.success) {
      throw new Error(result.error || "Failed to delete course")
    }
  },

  // Update course progress
  updateProgress: async (courseId: string, userId: string, progress: number): Promise<Course> => {

    const response = await api.patch(`/api/courses/${courseId}`, JSON.stringify({ userId, progress }), {
      headers: {
        "Content-Type": "application/json",
      }
    })


    if (!response.data.ok) {
      const errorData = await response.data.json().catch(() => ({}))
      throw new Error(errorData.error || `Failed to update progress: ${response.statusText}`)
    }

    const result: ApiResponse<Course> = await response.data.json()

    if (!result.success || !result.data) {
      throw new Error(result.error || "Failed to update progress")
    }

    return result.data
  },
}

// Category API endpoints
export const categoryApi = {
  // Get all categories for a user
  getCategories: async (userId: string): Promise<Category[]> => {
    const response = await api.get(`/api/categories?userId=${userId}`)

    if (!response.data.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`)
    }

    const result: ApiResponse<Category[]> = await response.data.json()

    if (!result.success || !result.data) {
      throw new Error(result.error || "Failed to fetch categories")
    }

    return result.data
  },

  // Create a new category
  createCategory: async (categoryData: {
    name: string
    userId: string
  }): Promise<Category> => {
    const response = await api.post(`/api/categories`,
      JSON.stringify(categoryData),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

    if (!response.data.ok) {
      const errorData = await response.data.json().catch(() => ({}))
      throw new Error(errorData.error || `Failed to create category: ${response.statusText}`)
    }

    const result: ApiResponse<Category> = await response.data.json()

    if (!result.success || !result.data) {
      throw new Error(result.error || "Failed to create category")
    }

    return result.data
  },

  // Update a category
  updateCategory: async (categoryId: string, updates: { name: string }): Promise<Category> => {
    const response = await api.put(`/api/categories/${categoryId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    })

    if (!response.data.ok) {
      const errorData = await response.data.json().catch(() => ({}))
      throw new Error(errorData.error || `Failed to update category: ${response.statusText}`)
    }

    const result: ApiResponse<Category> = await response.data.json()

    if (!result.success || !result.data) {
      throw new Error(result.error || "Failed to update category")
    }

    return result.data
  },

  // Delete a category
  deleteCategory: async (categoryId: string, userId: string): Promise<void> => {
    const response = await api.delete(`/api/categories/${categoryId}?userId=${userId}`)

    if (!response.data.ok) {
      const errorData = await response.data.json().catch(() => ({}))
      throw new Error(errorData.error || `Failed to delete category: ${response.statusText}`)
    }

    const result: ApiResponse<null> = await response.data.json()

    if (!result.success) {
      throw new Error(result.error || "Failed to delete category")
    }
  },
}

// YouTube API integration
export const youtubeApi = {
  // Get video information from YouTube URL
  getVideoInfo: async (
    youtubeUrl: string,
  ): Promise<{
    title: string
    channel: string
    thumbnail: string
    duration: string
    videoId: string
  }> => {
    const response = await fetch(`${API_BASE_URL}/youtube/info`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: youtubeUrl }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || "Failed to fetch video information")
    }

    const result: ApiResponse<{
      title: string
      channel: string
      thumbnail: string
      duration: string
      videoId: string
    }> = await response.json()

    if (!result.success || !result.data) {
      throw new Error(result.error || "Failed to fetch video information")
    }

    return result.data
  },

  // Validate YouTube URL
  validateUrl: async (youtubeUrl: string): Promise<boolean> => {
    try {
      await youtubeApi.getVideoInfo(youtubeUrl)
      return true
    } catch {
      return false
    }
  },
}
