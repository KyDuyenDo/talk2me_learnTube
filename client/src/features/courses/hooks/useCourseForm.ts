import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import type { FormData, VideoInfo } from "../types"

export const useCourseForm = (isOpen: boolean) => {
  const [showCreateCategory, setShowCreateCategory] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const handleSubmit = async (data: FormData, videoInfo: VideoInfo | null, onClose: () => void) => {
    if (!videoInfo) {
      form.setError("youtubeUrl", {
        type: "manual",
        message: "Please wait for video information to load",
      })
      return
    }

    setIsSubmitting(true)

    try {
      let categoryId = data.categoryId

      if (showCreateCategory && data.newCategoryName.trim()) {
        console.log("Creating new category:", data.newCategoryName.trim())
        categoryId = "new-category-id"
      }

      console.log("Creating course:", {
        title: data.title.trim(),
        description: data.description.trim(),
        youtubeUrl: data.youtubeUrl.trim(),
        categoryId,
      })

      await new Promise((resolve) => setTimeout(resolve, 1000))
      onClose()
    } catch (error) {
      console.error("Failed to create course:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    form,
    showCreateCategory,
    setShowCreateCategory,
    isSubmitting,
    handleSubmit,
  }
}
