import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import type { FormData, VideoInfo } from "../types"
import { useCreateCourse } from "./useCoursesApi"

export const useCourseForm = (isOpen: boolean) => {
  const [showCreateCategory, setShowCreateCategory] = useState(false)
  const { mutate, isPending, error, isSuccess } = useCreateCourse()

  const form = useForm<FormData>({
    defaultValues: {
      title: "",
      description: "",
      youtubeUrl: "",
      categoryId: "",
      newCategoryName: "",
    },
  })

  useEffect(() => {
    if (isOpen) {
      form.reset()
      setShowCreateCategory(false)
    }
  }, [isOpen, form])

  const handleSubmit = async (
    data: FormData,
    videoInfo: VideoInfo | null,
    socketId: string,
    onClose: () => void,
    onPending?: (youtubeUrl: string, info: { thumbnail: string; title: string }) => void,
  ) => {
    if (!videoInfo) {
      form.setError("youtubeUrl", {
        type: "manual",
        message: "Please wait for video information to load",
      })
      return
    }

    try {
      if (showCreateCategory && data.newCategoryName.trim()) {
        console.log("Creating new category:", data.newCategoryName.trim())
      }

      // Immediately show ghost card in grid with real thumbnail + title
      onPending?.(data.youtubeUrl.trim(), {
        thumbnail: videoInfo.thumbnail,
        title: videoInfo.title,
      })
      onClose()

      mutate(
        { youtubeUrl: data.youtubeUrl.trim(), categoryId: "68cbc96a95ca2402a9e3d626", socketId },
        {
          onSuccess: () => {
            console.log("Course creation queued successfully")
          },
          onError: (err) => {
            console.error("Failed to queue course creation:", err)
          },
        }
      )
    } catch (error) {
      console.error("Failed to create course:", error)
    }
  }

  return {
    form,
    showCreateCategory,
    setShowCreateCategory,
    isSubmitting: isPending,
    error,
    isSuccess,
    handleSubmit,
  }
}
