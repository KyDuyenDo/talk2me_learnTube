import type { Course, Category } from "../store/courseStore"

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

    const response = await fetch(`${API_BASE_URL}/courses?${searchParams}`)

    if (!response.ok) {
      throw new Error(`Failed to fetch courses: ${response.statusText}`)
    }

    const result: ApiResponse<PaginatedResponse<Course>> = await response.json()

    if (!result.success || !result.data) {
      throw new Error(result.error || "Failed to fetch courses")
    }

    return result.data
  },

  // Get a specific course
  getCourse: async (userId: string, courseId: string): Promise<Course> => {
    const response = await fetch(`${API_BASE_URL}/courses/${courseId}?userId=${userId}`)

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Course not found")
      }
      throw new Error(`Failed to fetch course: ${response.statusText}`)
    }

    const result: ApiResponse<Course> = await response.json()

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
    const response = await fetch(`${API_BASE_URL}/courses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(courseData),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `Failed to create course: ${response.statusText}`)
    }

    const result: ApiResponse<Course> = await response.json()

    if (!result.success || !result.data) {
      throw new Error(result.error || "Failed to create course")
    }

    return result.data
  },

  // Update a course
  updateCourse: async (courseId: string, updates: Partial<Course>): Promise<Course> => {
    const response = await fetch(`${API_BASE_URL}/courses/${courseId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `Failed to update course: ${response.statusText}`)
    }

    const result: ApiResponse<Course> = await response.json()

    if (!result.success || !result.data) {
      throw new Error(result.error || "Failed to update course")
    }

    return result.data
  },

  // Delete a course
  deleteCourse: async (courseId: string, userId: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/courses/${courseId}?userId=${userId}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `Failed to delete course: ${response.statusText}`)
    }

    const result: ApiResponse<null> = await response.json()

    if (!result.success) {
      throw new Error(result.error || "Failed to delete course")
    }
  },

  // Update course progress
  updateProgress: async (courseId: string, userId: string, progress: number): Promise<Course> => {
    const response = await fetch(`${API_BASE_URL}/courses/${courseId}/progress`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, progress }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `Failed to update progress: ${response.statusText}`)
    }

    const result: ApiResponse<Course> = await response.json()

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
    const response = await fetch(`${API_BASE_URL}/categories?userId=${userId}`)

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`)
    }

    const result: ApiResponse<Category[]> = await response.json()

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
    const response = await fetch(`${API_BASE_URL}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryData),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `Failed to create category: ${response.statusText}`)
    }

    const result: ApiResponse<Category> = await response.json()

    if (!result.success || !result.data) {
      throw new Error(result.error || "Failed to create category")
    }

    return result.data
  },

  // Update a category
  updateCategory: async (categoryId: string, updates: { name: string }): Promise<Category> => {
    const response = await fetch(`${API_BASE_URL}/categories/${categoryId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `Failed to update category: ${response.statusText}`)
    }

    const result: ApiResponse<Category> = await response.json()

    if (!result.success || !result.data) {
      throw new Error(result.error || "Failed to update category")
    }

    return result.data
  },

  // Delete a category
  deleteCategory: async (categoryId: string, userId: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/categories/${categoryId}?userId=${userId}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `Failed to delete category: ${response.statusText}`)
    }

    const result: ApiResponse<null> = await response.json()

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
