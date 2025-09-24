import { useState, useEffect, useRef, type FunctionComponent } from "react"
import { useForm, Controller } from "react-hook-form"
import type { Category } from "../../../store/courseStore"
import type { VideoInfo, FormData } from "../types"
import { useYouTubeInfo } from "../hooks/useCoursesApi"

interface CreateCourseModalProps {
  isOpen: boolean
  onClose: () => void
  categories: Category[]
}

const validateYouTubeUrl = (url: string): boolean => {
  const youtubeRegex =
    /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)[a-zA-Z0-9_-]{11}$/
  return youtubeRegex.test(url)
}

export const CreateCourseModal: FunctionComponent<CreateCourseModalProps> = ({ isOpen, onClose, categories }) => {
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null)
  const [showCreateCategory, setShowCreateCategory] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { mutateAsync: youtubeInfoMutateAsync, isPending: isLoading } = useYouTubeInfo()

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: "",
      description: "",
      youtubeUrl: "",
      categoryId: "",
      newCategoryName: "",
    },
  })

  const lastFetchedUrlRef = useRef<string>("")
  const fetchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const youtubeUrl = watch("youtubeUrl")

  useEffect(() => {
    if (isOpen) {
      reset()
      setVideoInfo(null)
      setShowCreateCategory(false)
      lastFetchedUrlRef.current = ""
    }
  }, [isOpen, reset])

  useEffect(() => {
    if (fetchTimeoutRef.current) {
      clearTimeout(fetchTimeoutRef.current)
    }

    const validateAndFetchVideoInfo = async () => {
      const url = youtubeUrl?.trim() || ""

      if (!url) {
        setVideoInfo(null)
        lastFetchedUrlRef.current = ""
        return
      }

      if (!validateYouTubeUrl(url)) {
        setError("youtubeUrl", {
          type: "manual",
          message: "Please enter a valid YouTube URL",
        })
        setVideoInfo(null)
        lastFetchedUrlRef.current = ""
        return
      }

      if (url === lastFetchedUrlRef.current) {
        return
      }

      clearErrors("youtubeUrl")

      lastFetchedUrlRef.current = url

      try {
        const info = await youtubeInfoMutateAsync(url)
        console.log(info)
        setVideoInfo(info)

        const currentTitle = watch("title")
        if (!currentTitle?.trim()) {
          setValue("title", info.title)
        }
      } catch (error) {
        setError("youtubeUrl", {
          type: "manual",
          message: "Failed to fetch video information",
        })
        setVideoInfo(null)
        lastFetchedUrlRef.current = ""
      }
    }

    fetchTimeoutRef.current = setTimeout(validateAndFetchVideoInfo, 500)

    return () => {
      if (fetchTimeoutRef.current) {
        clearTimeout(fetchTimeoutRef.current)
      }
    }
  }, [youtubeUrl, setError, clearErrors, setValue, watch])

  const onSubmit = async (data: FormData) => {
    if (!videoInfo) {
      setError("youtubeUrl", {
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

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">

        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Add New Course</h2>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">YouTube URL *</label>
            <div className="relative">
              <Controller
                name="youtubeUrl"
                control={control}
                rules={{ required: "YouTube URL is required" }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="url"
                    placeholder="https://www.youtube.com/watch?v=..."
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.youtubeUrl ? "border-red-500" : "border-gray-300"
                      }`}
                  />
                )}
              />
              {isLoading && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>
            {errors.youtubeUrl && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.youtubeUrl.message}
              </p>
            )}
          </div>

          {videoInfo && (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex gap-4">
                <img
                  src={videoInfo.thumbnail || "/placeholder.svg"}
                  alt={videoInfo.title}
                  className="w-32 h-18 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="font-medium mb-1 text-gray-900">{videoInfo.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">{videoInfo.channel}</p>
                </div>
              </div>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>

            {!showCreateCategory ? (
              <div className="space-y-3">
                <Controller
                  name="categoryId"
                  control={control}
                  rules={{ required: "Please select a category" }}
                  render={({ field }) => (
                    <div className="relative">
                      <select
                        {...field}
                        className={`w-full px-4 py-3 pr-10 border rounded-lg shadow-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none cursor-pointer hover:border-gray-400 ${errors.categoryId ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                          }`}
                      >
                        <option value="" className="text-gray-500">
                          Select a category
                        </option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id} className="text-gray-900 py-2">
                            {category.name}
                          </option>
                        ))}
                      </select>

                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg
                          className={`w-5 h-5 transition-colors ${errors.categoryId ? "text-red-500" : "text-gray-400"
                            }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  )}
                />

                <button
                  type="button"
                  onClick={() => setShowCreateCategory(true)}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors hover:bg-blue-50 px-3 py-2 rounded-md"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create new category
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <Controller
                  name="newCategoryName"
                  control={control}
                  rules={{ required: "Category name is required" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="Enter new category name"
                      className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 ${errors.newCategoryName ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                        }`}
                    />
                  )}
                />

                <button
                  type="button"
                  onClick={() => {
                    setShowCreateCategory(false)
                    setValue("newCategoryName", "")
                    clearErrors("newCategoryName")
                  }}
                  className="text-gray-600 hover:text-gray-700 text-sm font-medium transition-colors hover:bg-gray-50 px-3 py-2 rounded-md flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Back to category selection
                </button>
              </div>
            )}

            {(errors.categoryId || errors.newCategoryName) && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.categoryId?.message || errors.newCategoryName?.message}
              </p>
            )}
          </div>
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !videoInfo}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              {isSubmitting && (
                <div className="mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              {isSubmitting ? "Creating..." : "Create Course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateCourseModal
