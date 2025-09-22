import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useCourseStore } from "../store/courseStore"
import { courseApi, categoryApi, youtubeApi } from "../api/courseApi"
import type { Course } from "../store/courseStore"

// Query keys
export const courseKeys = {
  all: ["courses"] as const,
  lists: () => [...courseKeys.all, "list"] as const,
  list: (userId: string, filters?: any) => [...courseKeys.lists(), userId, filters] as const,
  details: () => [...courseKeys.all, "detail"] as const,
  detail: (userId: string, courseId: string) => [...courseKeys.details(), userId, courseId] as const,
}

export const categoryKeys = {
  all: ["categories"] as const,
  lists: () => [...categoryKeys.all, "list"] as const,
  list: (userId: string) => [...categoryKeys.lists(), userId] as const,
}

// Course hooks
export const useCourses = (
  userId: string,
  params?: {
    page?: number
    limit?: number
    categoryId?: string
    search?: string
    sortBy?: "createdAt" | "title" | "progress"
    sortOrder?: "asc" | "desc"
  },
) => {
  const { setCourses, setLoading, setError } = useCourseStore()

  return useQuery({
    queryKey: courseKeys.list(userId, params),
    queryFn: () => courseApi.getCourses(userId, params),
    onSuccess: (data) => {
      setCourses(data.data)
      setLoading(false)
      setError(null)
    },
    onError: (error: Error) => {
      setError(error.message)
      setLoading(false)
    },
    onLoading: () => setLoading(true),
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
  })
}

export const useCourse = (userId: string, courseId: string) => {
  const { setSelectedCourse, setLoading, setError } = useCourseStore()

  return useQuery({
    queryKey: courseKeys.detail(userId, courseId),
    queryFn: () => courseApi.getCourse(userId, courseId),
    enabled: !!courseId && !!userId,
    onSuccess: (data) => {
      setSelectedCourse(data)
      setLoading(false)
      setError(null)
    },
    onError: (error: Error) => {
      setError(error.message)
      setLoading(false)
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
  })
}

export const useCategories = (userId: string) => {
  const { setCategories, setLoading, setError } = useCourseStore()

  return useQuery({
    queryKey: categoryKeys.list(userId),
    queryFn: () => categoryApi.getCategories(userId),
    enabled: !!userId,
    onSuccess: (data) => {
      setCategories(data)
      setLoading(false)
      setError(null)
    },
    onError: (error: Error) => {
      setError(error.message)
      setLoading(false)
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}

// Mutation hooks
export const useCreateCourse = () => {
  const queryClient = useQueryClient()
  const { addCourse, setError, setCreateModalOpen } = useCourseStore()

  return useMutation({
    mutationFn: courseApi.createCourse,
    onSuccess: (newCourse) => {
      addCourse(newCourse)
      queryClient.invalidateQueries({ queryKey: courseKeys.all })
      setCreateModalOpen(false)
      setError(null)
    },
    onError: (error: Error) => {
      setError(error.message)
    },
  })
}

export const useUpdateCourse = () => {
  const queryClient = useQueryClient()
  const { updateCourse, setError } = useCourseStore()

  return useMutation({
    mutationFn: ({ courseId, updates }: { courseId: string; updates: Partial<Course> }) =>
      courseApi.updateCourse(courseId, updates),
    onSuccess: (updatedCourse) => {
      updateCourse(updatedCourse.id, updatedCourse)
      queryClient.invalidateQueries({ queryKey: courseKeys.all })
      setError(null)
    },
    onError: (error: Error) => {
      setError(error.message)
    },
  })
}

export const useDeleteCourse = () => {
  const queryClient = useQueryClient()
  const { removeCourse, setError } = useCourseStore()

  return useMutation({
    mutationFn: ({ courseId, userId }: { courseId: string; userId: string }) =>
      courseApi.deleteCourse(courseId, userId),
    onSuccess: (_, { courseId }) => {
      removeCourse(courseId)
      queryClient.invalidateQueries({ queryKey: courseKeys.all })
      setError(null)
    },
    onError: (error: Error) => {
      setError(error.message)
    },
  })
}

export const useUpdateProgress = () => {
  const queryClient = useQueryClient()
  const { updateCourse, setError } = useCourseStore()

  return useMutation({
    mutationFn: ({ courseId, userId, progress }: { courseId: string; userId: string; progress: number }) =>
      courseApi.updateProgress(courseId, userId, progress),
    onSuccess: (updatedCourse) => {
      updateCourse(updatedCourse.id, { progress: updatedCourse.progress, isCompleted: updatedCourse.isCompleted })
      queryClient.invalidateQueries({ queryKey: courseKeys.detail(updatedCourse.userId, updatedCourse.id) })
      setError(null)
    },
    onError: (error: Error) => {
      setError(error.message)
    },
  })
}

// Category mutation hooks
export const useCreateCategory = () => {
  const queryClient = useQueryClient()
  const { addCategory, setError } = useCourseStore()

  return useMutation({
    mutationFn: categoryApi.createCategory,
    onSuccess: (newCategory) => {
      addCategory(newCategory)
      queryClient.invalidateQueries({ queryKey: categoryKeys.all })
      setError(null)
    },
    onError: (error: Error) => {
      setError(error.message)
    },
  })
}

export const useUpdateCategory = () => {
  const queryClient = useQueryClient()
  const { updateCategory, setError } = useCourseStore()

  return useMutation({
    mutationFn: ({ categoryId, updates }: { categoryId: string; updates: { name: string } }) =>
      categoryApi.updateCategory(categoryId, updates),
    onSuccess: (updatedCategory) => {
      updateCategory(updatedCategory.id, updatedCategory)
      queryClient.invalidateQueries({ queryKey: categoryKeys.all })
      setError(null)
    },
    onError: (error: Error) => {
      setError(error.message)
    },
  })
}

export const useDeleteCategory = () => {
  const queryClient = useQueryClient()
  const { removeCategory, setError } = useCourseStore()

  return useMutation({
    mutationFn: ({ categoryId, userId }: { categoryId: string; userId: string }) =>
      categoryApi.deleteCategory(categoryId, userId),
    onSuccess: (_, { categoryId }) => {
      removeCategory(categoryId)
      queryClient.invalidateQueries({ queryKey: categoryKeys.all })
      queryClient.invalidateQueries({ queryKey: courseKeys.all })
      setError(null)
    },
    onError: (error: Error) => {
      setError(error.message)
    },
  })
}

// YouTube hooks
export const useYouTubeInfo = () => {
  return useMutation({
    mutationFn: youtubeApi.getVideoInfo,
    retry: 2,
  })
}

export const useValidateYouTubeUrl = () => {
  return useMutation({
    mutationFn: youtubeApi.validateUrl,
    retry: 1,
  })
}
