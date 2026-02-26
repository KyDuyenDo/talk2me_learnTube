import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { categoryApi, courseApi, youtubeApi } from "../api/courseApi"

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
  const query = useQuery({
    queryKey: courseKeys.list(params),
    queryFn: () => courseApi.getCourses(params),
    staleTime: 1000 * 60 * 5,
  })

  return query
}

export const useCourse = (courseId: string) => {

  const query = useQuery({
    queryKey: courseKeys.detail(courseId),
    queryFn: () => courseApi.getCourse(courseId),
    enabled: !!courseId,
    staleTime: 1000 * 60 * 2,
  })

  return query
}

export const useCategories = () => {

  const query = useQuery({
    queryKey: categoryKeys.list(),
    queryFn: () => categoryApi.getCategories(),
    staleTime: 1000 * 60 * 10,
  })

  return query
}

// Mutation hooks POST
export const useCreateCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { youtubeUrl: string; categoryId: string; socketId: string }) =>
      courseApi.createCourse(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: courseKeys.all });
    },
  });
};



export const useDeleteCourse = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ courseId, }: { courseId: string; }) =>
      courseApi.deleteCourse(courseId,),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: courseKeys.all })
    },
  })
}

export const useUpdateProgress = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ courseId, progress }: { courseId: string; progress: number }) =>
      courseApi.updateProgress(courseId, progress),
    onSuccess: (updatedCourse) => {
      queryClient.invalidateQueries({ queryKey: courseKeys.detail(updatedCourse._id) })
    },
  })
}

// Category mutation hooks
export const useCreateCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: categoryApi.createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all })
    },
  })
}

export const useDeleteCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ categoryId, }: { categoryId: string; }) =>
      categoryApi.deleteCategory(categoryId,),
    onSuccess: () => {
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
