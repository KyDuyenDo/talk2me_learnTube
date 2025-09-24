import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useCourseStore } from "../store/courseStore"

import { categoryApi, courseApi, youtubeApi } from "../features/courses/api/courseApi"
import { useEffect } from "react"

// Query keys
export const courseKeys = {
  all: ["courses"] as const,
  lists: () => [...courseKeys.all, "list"] as const,
  list: (filters?: any) => [...courseKeys.lists(), filters] as const,
  details: () => [...courseKeys.all, "detail"] as const,
  detail: (courseId: string) => [...courseKeys.details(), courseId] as const,
}

export const categoryKeys = {
  all: ["categories"] as const,
  lists: () => [...categoryKeys.all, "list"] as const,
  list: () => [...categoryKeys.lists()] as const,
}

// Course hooks GET
export const useCourses = (
  params?: {
    page?: number
    limit?: number
    categoryId?: string
    search?: string
    sortBy?: "createdAt" | "title" | "progress"
    sortOrder?: "asc" | "desc"
  },
) => {
  const { setCourses } = useCourseStore()
  const query = useQuery({
    queryKey: courseKeys.list(params),
    queryFn: () => courseApi.getCourses(params),
    staleTime: 1000 * 60 * 5,
  })

  useEffect(() => {
    if (query.data) {
      setCourses(query.data.data)
    }
  }, [query.data, setCourses])

  return query
}

export const useCourse = (courseId: string) => {
  const { setSelectedCourse } = useCourseStore()

  const query = useQuery({
    queryKey: courseKeys.detail(courseId),
    queryFn: () => courseApi.getCourse(courseId),
    enabled: !!courseId,
    staleTime: 1000 * 60 * 2,
  })

  useEffect(() => {
    if (query.data) {
      setSelectedCourse(query.data)
    }
  }, [query.data, setSelectedCourse])

  return
}

export const useCategories = () => {
  const { setCategories } = useCourseStore()

  const query = useQuery({
    queryKey: categoryKeys.list(),
    queryFn: () => categoryApi.getCategories(),
    staleTime: 1000 * 60 * 10,
  })

  useEffect(() => {
    if (query.data) {
      setCategories(query.data)
    }
  }, [query.data, setCategories])

  return query
}

// Mutation hooks POST
export const useCreateCourse = () => {
  const queryClient = useQueryClient()
  const { addCourse, setCreateModalOpen } = useCourseStore()

  return useMutation({
    mutationFn: courseApi.createCourse,
    onSuccess: (newCourse) => {
      addCourse(newCourse)
      queryClient.invalidateQueries({ queryKey: courseKeys.all })
      setCreateModalOpen(false)
    },
  })
}


export const useDeleteCourse = () => {
  const queryClient = useQueryClient()
  const { removeCourse } = useCourseStore()

  return useMutation({
    mutationFn: ({ courseId, }: { courseId: string; }) =>
      courseApi.deleteCourse(courseId,),
    onSuccess: (_, { courseId }) => {
      removeCourse(courseId)
      queryClient.invalidateQueries({ queryKey: courseKeys.all })
    },
  })
}

export const useUpdateProgress = () => {
  const queryClient = useQueryClient()
  const { updateCourse } = useCourseStore()

  return useMutation({
    mutationFn: ({ courseId, progress }: { courseId: string; progress: number }) =>
      courseApi.updateProgress(courseId, progress),
    onSuccess: (updatedCourse) => {
      updateCourse(updatedCourse.id, { progress: updatedCourse.progress, isCompleted: updatedCourse.isCompleted })
      queryClient.invalidateQueries({ queryKey: courseKeys.detail(updatedCourse.id) })
    },
  })
}

// Category mutation hooks
export const useCreateCategory = () => {
  const queryClient = useQueryClient()
  const { addCategory } = useCourseStore()

  return useMutation({
    mutationFn: categoryApi.createCategory,
    onSuccess: (newCategory) => {
      addCategory(newCategory)
      queryClient.invalidateQueries({ queryKey: categoryKeys.all })
    },
  })
}

export const useDeleteCategory = () => {
  const queryClient = useQueryClient()
  const { removeCategory } = useCourseStore()

  return useMutation({
    mutationFn: ({ categoryId, }: { categoryId: string; }) =>
      categoryApi.deleteCategory(categoryId,),
    onSuccess: (_, { categoryId }) => {
      removeCategory(categoryId)
      queryClient.invalidateQueries({ queryKey: categoryKeys.all })
      queryClient.invalidateQueries({ queryKey: courseKeys.all })
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
