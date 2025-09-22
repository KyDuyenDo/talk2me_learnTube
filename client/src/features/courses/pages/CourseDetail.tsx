import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useCourse, useUpdateCourseProgress } from "../../../hooks/useCoursesApi"
import { useCourseStore } from "../../../store/courseStore"
import LoadingSpinner from "../../../components/LoadingSpinner"
import ErrorMessage from "../../../components/ErrorMessage"
import {
  ArrowLeftIcon,
  PlayIcon,
  PauseIcon,
  CheckCircleIcon,
  BookOpenIcon,
  ClockIcon,
  ExternalLinkIcon,
  EditIcon,
  TrashIcon,
} from "../../../utils/constant/icon"

export function CourseDetail() {
  const { courseId } = useParams<{ courseId: string }>()
  const navigate = useNavigate()
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentProgress, setCurrentProgress] = useState(0)

  // API hooks
  const { data: course, isLoading, error, refetch } = useCourse(courseId!)
  const updateProgressMutation = useUpdateCourseProgress()

  // Store actions
  const { deleteCourse } = useCourseStore()

  useEffect(() => {
    if (course) {
      setCurrentProgress(course.progress || 0)
    }
  }, [course])

  const handleProgressUpdate = async (newProgress: number) => {
    if (!course) return

    try {
      await updateProgressMutation.mutateAsync({
        courseId: course.id,
        progress: newProgress,
        isCompleted: newProgress >= 100,
      })
      setCurrentProgress(newProgress)
    } catch (error) {
      console.error("Failed to update progress:", error)
    }
  }

  const handleMarkComplete = () => {
    handleProgressUpdate(100)
  }

  const handleDelete = async () => {
    if (!course) return

    if (window.confirm(`Are you sure you want to delete "${course.title}"?`)) {
      try {
        await deleteCourse(course.id)
        navigate("/courses")
      } catch (error) {
        console.error("Failed to delete course:", error)
      }
    }
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <LoadingSpinner size="lg" className="text-[var(--color-primary)] mb-4" />
            <p className="text-[var(--color-text-secondary)]">Loading course...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !course) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-8">
        <ErrorMessage message={error?.message || "Course not found"} onRetry={refetch} />
      </div>
    )
  }

  const isCompleted = course.isCompleted || currentProgress >= 100

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/courses")}
          className="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] mb-4 transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Back to Courses
        </button>

        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
          <div className="flex-1">
            <h1 className="text-[var(--font-size-3xl)] font-bold text-[var(--color-text-primary)] mb-2">
              {course.title}
            </h1>
            <p className="text-[var(--color-text-secondary)] mb-4">by {course.channel}</p>

            {course.description && <p className="text-[var(--color-text-primary)] mb-4">{course.description}</p>}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/courses/${course.id}/edit`)}
              className="flex items-center gap-2 px-4 py-2 text-[var(--font-size-sm)] font-medium text-[var(--color-text-primary)] border-[var(--border-width-normal)] border-[var(--color-border)] rounded-[var(--border-radius-md)] hover:bg-[var(--color-surface)] transition-colors"
            >
              <EditIcon className="w-4 h-4" />
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 text-[var(--font-size-sm)] font-medium text-[var(--color-error)] border-[var(--border-width-normal)] border-[var(--color-error)] rounded-[var(--border-radius-md)] hover:bg-[var(--color-error)] hover:text-white transition-colors"
            >
              <TrashIcon className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Video Player Section */}
      <div className="mb-8">
        <div className="bg-[var(--color-background)] rounded-[var(--border-radius-lg)] border-[var(--border-width-normal)] border-[var(--color-border)] overflow-hidden shadow-[var(--shadow-md)]">
          <div className="aspect-video relative">
            <iframe
              src={`https://www.youtube.com/embed/${course.videoId}?autoplay=${isPlaying ? 1 : 0}`}
              title={course.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Video Controls */}
          <div className="p-4 border-t border-[var(--color-border)]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-white rounded-[var(--border-radius-md)] hover:opacity-90 transition-opacity"
                >
                  {isPlaying ? (
                    <>
                      <PauseIcon className="w-4 h-4" />
                      Pause
                    </>
                  ) : (
                    <>
                      <PlayIcon className="w-4 h-4" />
                      Play
                    </>
                  )}
                </button>

                <a
                  href={course.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-[var(--color-text-secondary)] border-[var(--border-width-normal)] border-[var(--color-border)] rounded-[var(--border-radius-md)] hover:bg-[var(--color-surface)] transition-colors"
                >
                  <ExternalLinkIcon className="w-4 h-4" />
                  Watch on YouTube
                </a>
              </div>

              {!isCompleted && (
                <button
                  onClick={handleMarkComplete}
                  disabled={updateProgressMutation.isLoading}
                  className="flex items-center gap-2 px-4 py-2 bg-[var(--color-success)] text-white rounded-[var(--border-radius-md)] hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                >
                  {updateProgressMutation.isLoading ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    <CheckCircleIcon className="w-4 h-4" />
                  )}
                  Mark Complete
                </button>
              )}
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[var(--font-size-sm)] font-medium text-[var(--color-text-primary)]">
                  Progress
                </span>
                <span className="text-[var(--font-size-sm)] text-[var(--color-text-secondary)]">
                  {Math.round(currentProgress)}%
                </span>
              </div>
              <div className="w-full bg-[var(--color-surface)] rounded-full h-2">
                <div
                  className="bg-[var(--color-primary)] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${currentProgress}%` }}
                />
              </div>
            </div>

            {/* Progress Controls */}
            <div className="flex gap-2">
              {[25, 50, 75, 100].map((progress) => (
                <button
                  key={progress}
                  onClick={() => handleProgressUpdate(progress)}
                  disabled={updateProgressMutation.isLoading}
                  className={`px-3 py-1 text-[var(--font-size-xs)] font-medium rounded-[var(--border-radius-sm)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                    currentProgress >= progress
                      ? "bg-[var(--color-primary)] text-white"
                      : "bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)]"
                  }`}
                >
                  {progress}%
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Course Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="bg-[var(--color-background)] rounded-[var(--border-radius-lg)] border-[var(--border-width-normal)] border-[var(--color-border)] p-6">
            <h2 className="text-[var(--font-size-xl)] font-semibold text-[var(--color-text-primary)] mb-4">
              About This Course
            </h2>

            {course.description ? (
              <p className="text-[var(--color-text-primary)] leading-relaxed">{course.description}</p>
            ) : (
              <p className="text-[var(--color-text-muted)] italic">No description available for this course.</p>
            )}
          </div>
        </div>

        <div className="space-y-6">
          {/* Course Stats */}
          <div className="bg-[var(--color-background)] rounded-[var(--border-radius-lg)] border-[var(--border-width-normal)] border-[var(--color-border)] p-6">
            <h3 className="text-[var(--font-size-lg)] font-semibold text-[var(--color-text-primary)] mb-4">
              Course Details
            </h3>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <BookOpenIcon className="w-4 h-4 text-[var(--color-text-muted)]" />
                <span className="text-[var(--font-size-sm)] text-[var(--color-text-secondary)]">
                  Channel: {course.channel}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <ClockIcon className="w-4 h-4 text-[var(--color-text-muted)]" />
                <span className="text-[var(--font-size-sm)] text-[var(--color-text-secondary)]">
                  Added: {new Date(course.createdAt || "").toLocaleDateString()}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircleIcon
                  className={`w-4 h-4 ${isCompleted ? "text-[var(--color-success)]" : "text-[var(--color-text-muted)]"}`}
                />
                <span className="text-[var(--font-size-sm)] text-[var(--color-text-secondary)]">
                  Status: {isCompleted ? "Completed" : "In Progress"}
                </span>
              </div>
            </div>
          </div>

          {/* Completion Badge */}
          {isCompleted && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-[var(--border-radius-lg)] p-6 text-center">
              <CheckCircleIcon className="w-12 h-12 text-[var(--color-success)] mx-auto mb-3" />
              <h3 className="text-[var(--font-size-lg)] font-semibold text-green-800 mb-2">Course Completed!</h3>
              <p className="text-[var(--font-size-sm)] text-green-600">
                Congratulations on finishing this course. Keep up the great work!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CourseDetail
