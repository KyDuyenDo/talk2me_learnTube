import type React from "react"

import { useState, useEffect, type FunctionComponent } from "react"
import { Modal } from "../../../components/Modal"
import LoadingSpinner from "../../../components/LoadingSpinner"
import { useCreateCourse, useCreateCategory } from "../../../hooks/useCoursesApi"
import { useYouTubeInfo } from "../../../hooks/useCoursesApi"
import { useCourseStore } from "../../../store/courseStore"
import { validateYouTubeUrl } from "../../../utils/youtube"
import type { Category } from "../../../store/courseStore"
// import { PlusIcon, ExternalLinkIcon, AlertCircleIcon } from "../../../utils/constant/icon"

interface CreateCourseModalProps {
  isOpen: boolean
  onClose: () => void
  categories: Category[]
  userId: string
}

interface FormData {
  title: string
  description: string
  youtubeUrl: string
  categoryId: string
  newCategoryName: string
}

interface VideoInfo {
  title: string
  channel: string
  thumbnail: string
  duration: string
  videoId: string
}

export const CreateCourseModal: FunctionComponent<CreateCourseModalProps> = ({
  isOpen,
  onClose,
  categories,
  userId,
}) => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    youtubeUrl: "",
    categoryId: "",
    newCategoryName: "",
  })

  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null)
  const [showCreateCategory, setShowCreateCategory] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [isValidatingUrl, setIsValidatingUrl] = useState(false)

  const createCourseMutation = useCreateCourse()
  const createCategoryMutation = useCreateCategory()
  const youtubeInfoMutation = useYouTubeInfo()
  const { setError } = useCourseStore()

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setFormData({
        title: "",
        description: "",
        youtubeUrl: "",
        categoryId: "",
        newCategoryName: "",
      })
      setVideoInfo(null)
      setShowCreateCategory(false)
      setErrors({})
    }
  }, [isOpen])

  // Validate YouTube URL and fetch video info
  useEffect(() => {
    const validateAndFetchVideoInfo = async () => {
      if (!formData.youtubeUrl.trim()) {
        setVideoInfo(null)
        return
      }

      if (!validateYouTubeUrl(formData.youtubeUrl)) {
        setErrors((prev) => ({ ...prev, youtubeUrl: "Please enter a valid YouTube URL" }))
        setVideoInfo(null)
        return
      }

      setIsValidatingUrl(true)
      setErrors((prev) => ({ ...prev, youtubeUrl: undefined }))

      try {
        const info = await youtubeInfoMutation.mutateAsync(formData.youtubeUrl)
        setVideoInfo(info)

        // Auto-fill title if empty
        if (!formData.title.trim()) {
          setFormData((prev) => ({ ...prev, title: info.title }))
        }
      } catch (error) {
        setErrors((prev) => ({ ...prev, youtubeUrl: "Failed to fetch video information" }))
        setVideoInfo(null)
      } finally {
        setIsValidatingUrl(false)
      }
    }

    const timeoutId = setTimeout(validateAndFetchVideoInfo, 500)
    return () => clearTimeout(timeoutId)
  }, [formData.youtubeUrl, youtubeInfoMutation])

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!formData.youtubeUrl.trim()) {
      newErrors.youtubeUrl = "YouTube URL is required"
    } else if (!validateYouTubeUrl(formData.youtubeUrl)) {
      newErrors.youtubeUrl = "Please enter a valid YouTube URL"
    }

    if (!showCreateCategory && !formData.categoryId) {
      newErrors.categoryId = "Please select a category"
    }

    if (showCreateCategory && !formData.newCategoryName.trim()) {
      newErrors.newCategoryName = "Category name is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm() || !videoInfo) {
      return
    }

    try {
      let categoryId = formData.categoryId

      // Create new category if needed
      if (showCreateCategory && formData.newCategoryName.trim()) {
        const newCategory = await createCategoryMutation.mutateAsync({
          name: formData.newCategoryName.trim(),
          userId,
        })
        categoryId = newCategory.id
      }

      // Create course
      await createCourseMutation.mutateAsync({
        title: formData.title.trim(),
        description: formData.description.trim(),
        youtubeUrl: formData.youtubeUrl.trim(),
        categoryId,
        userId,
      })

      onClose()
    } catch (error) {
      console.error("Failed to create course:", error)
    }
  }

  const isLoading = createCourseMutation.isLoading || createCategoryMutation.isLoading

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Course" size="lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* YouTube URL Input */}
        <div>
          <label className="block text-[var(--font-size-sm)] font-medium text-[var(--color-text-primary)] mb-2">
            YouTube URL *
          </label>
          <div className="relative">
            <input
              type="url"
              value={formData.youtubeUrl}
              onChange={(e) => handleInputChange("youtubeUrl", e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className={`w-full px-[var(--spacing-md)] py-[var(--spacing-sm)] border-[var(--border-width-normal)] rounded-[var(--border-radius-md)] bg-[var(--color-background)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent ${
                errors.youtubeUrl ? "border-[var(--color-error)]" : "border-[var(--color-border)]"
              }`}
            />
            {isValidatingUrl && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <LoadingSpinner size="sm" />
              </div>
            )}
          </div>
          {errors.youtubeUrl && (
            <p className="mt-1 text-[var(--font-size-xs)] text-[var(--color-error)] flex items-center gap-1">
              {/* <AlertCircleIcon className="w-3 h-3" /> */}
              <div className="w-3 h-3">⚠️</div>
              {errors.youtubeUrl}
            </p>
          )}
        </div>

        {/* Video Preview */}
        {videoInfo && (
          <div className="bg-[var(--color-surface)] rounded-[var(--border-radius-md)] p-4">
            <div className="flex gap-4">
              <img
                src={videoInfo.thumbnail || "/placeholder.svg"}
                alt={videoInfo.title}
                className="w-32 h-18 object-cover rounded-[var(--border-radius-sm)]"
              />
              <div className="flex-1">
                <h4 className="font-medium text-[var(--color-text-primary)] mb-1">{videoInfo.title}</h4>
                <p className="text-[var(--font-size-sm)] text-[var(--color-text-secondary)] mb-2">
                  {videoInfo.channel}
                </p>
                <div className="flex items-center gap-2 text-[var(--font-size-xs)] text-[var(--color-text-muted)]">
                  <span>Duration: {videoInfo.duration}</span>
                  <a
                    href={formData.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[var(--color-primary)] hover:underline"
                  >
                    <div className="w-3 h-3">🔗</div>
                    View on YouTube
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Course Title */}
        <div>
          <label className="block text-[var(--font-size-sm)] font-medium text-[var(--color-text-primary)] mb-2">
            Course Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            placeholder="Enter course title"
            className={`w-full px-[var(--spacing-md)] py-[var(--spacing-sm)] border-[var(--border-width-normal)] rounded-[var(--border-radius-md)] bg-[var(--color-background)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent ${
              errors.title ? "border-[var(--color-error)]" : "border-[var(--color-border)]"
            }`}
          />
          {errors.title && (
            <p className="mt-1 text-[var(--font-size-xs)] text-[var(--color-error)] flex items-center gap-1">
              <AlertCircleIcon className="w-3 h-3" />
              {errors.title}
            </p>
          )}
        </div>

        {/* Course Description */}
        <div>
          <label className="block text-[var(--font-size-sm)] font-medium text-[var(--color-text-primary)] mb-2">
            Description (Optional)
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="Enter course description"
            rows={3}
            className="w-full px-[var(--spacing-md)] py-[var(--spacing-sm)] border-[var(--border-width-normal)] border-[var(--color-border)] rounded-[var(--border-radius-md)] bg-[var(--color-background)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent resize-none"
          />
        </div>

        {/* Category Selection */}
        <div>
          <label className="block text-[var(--font-size-sm)] font-medium text-[var(--color-text-primary)] mb-2">
            Category *
          </label>

          {!showCreateCategory ? (
            <div className="space-y-3">
              <select
                value={formData.categoryId}
                onChange={(e) => handleInputChange("categoryId", e.target.value)}
                className={`w-full px-[var(--spacing-md)] py-[var(--spacing-sm)] border-[var(--border-width-normal)] rounded-[var(--border-radius-md)] bg-[var(--color-background)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent ${
                  errors.categoryId ? "border-[var(--color-error)]" : "border-[var(--color-border)]"
                }`}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => setShowCreateCategory(true)}
                className="flex items-center gap-2 text-[var(--font-size-sm)] text-[var(--color-primary)] hover:underline"
              >
                <div className="w-4 h-4">➕</div>
                Create new category
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <input
                type="text"
                value={formData.newCategoryName}
                onChange={(e) => handleInputChange("newCategoryName", e.target.value)}
                placeholder="Enter new category name"
                className={`w-full px-[var(--spacing-md)] py-[var(--spacing-sm)] border-[var(--border-width-normal)] rounded-[var(--border-radius-md)] bg-[var(--color-background)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent ${
                  errors.newCategoryName ? "border-[var(--color-error)]" : "border-[var(--color-border)]"
                }`}
              />

              <button
                type="button"
                onClick={() => {
                  setShowCreateCategory(false)
                  setFormData((prev) => ({ ...prev, newCategoryName: "" }))
                  setErrors((prev) => ({ ...prev, newCategoryName: undefined }))
                }}
                className="text-[var(--font-size-sm)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
              >
                ← Back to category selection
              </button>
            </div>
          )}

          {(errors.categoryId || errors.newCategoryName) && (
            <p className="mt-1 text-[var(--font-size-xs)] text-[var(--color-error)] flex items-center gap-1">
              <div className="w-3 h-3">⚠️</div>
              {errors.categoryId || errors.newCategoryName}
            </p>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex gap-3 pt-4 border-t border-[var(--color-border)]">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 px-4 py-2 text-[var(--font-size-sm)] font-medium text-[var(--color-text-secondary)] border-[var(--border-width-normal)] border-[var(--color-border)] rounded-[var(--border-radius-md)] hover:bg-[var(--color-surface)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading || !videoInfo}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-[var(--font-size-sm)] font-medium text-white bg-[var(--color-primary)] rounded-[var(--border-radius-md)] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading && <LoadingSpinner size="sm" />}
            {isLoading ? "Creating..." : "Create Course"}
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default CreateCourseModal
