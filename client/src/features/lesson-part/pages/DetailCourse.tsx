import type { FunctionComponent } from "react"
import LessonPart from "../components/LessonPart"
import { LeftIcon } from "../../../utils/constant/icon"
import { useNavigate, useParams } from "react-router-dom"
import { useGetLessonParts } from "../hooks/useLessonPartApi"
import LoadingSpinner from "../../../components/LoadingSpinner"
import ErrorMessage from "../../../components/ErrorMessage"

type CourseDetailProps = {}

type LessonPartType = {
  _id: string
  courseId: string
  type: string
  theory: string
  completed: boolean
  updateAt: string
}

const CourseDetail: FunctionComponent<CourseDetailProps> = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { error, data: lessonData, isPending: isLoading, refetch: onRetry } = useGetLessonParts(id || "")

  const handleClickResult = (lessonTitle: string) => {
    alert(`Xem kết quả cho ${lessonTitle}`)
  }

  const handleClickAccess = (lessonTitle: string) => {
    alert(`Truy cập ${lessonTitle}`)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <LoadingSpinner size="lg" className="text-[var(--color-primary)] mb-4" />
          <p className="text-[var(--color-text-secondary)]">Loading lesson...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-8">
        <ErrorMessage message={error.message} onRetry={onRetry} />
      </div>
    )
  }

  if (!lessonData || lessonData.length === 0) {
    return (
      <div className="min-h-screen bg-white px-7 py-8">
        <div className="p-3">
          <div className="flex justify-start">
            <button onClick={() => navigate(-1)} className="flex">
              <LeftIcon />
              <span className="text-[length:var(--font-size-sm)] text-[var(--color-primary)]">Back</span>
            </button>
          </div>
          <div className="pt-8 text-center">
            <p className="text-[var(--color-text-secondary)]">No lessons available</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white px-7 py-8">
      <div className="p-3">
        {/* Header */}
        <div className="flex justify-start">
          <button onClick={() => navigate(-1)} className="flex">
            <LeftIcon />
            <span className="text-[length:var(--font-size-sm)] text-[var(--color-primary)]">Back</span>
          </button>
        </div>

        {/* Course Content */}
        <div className="pt-8">
          <div className="space-y-6">
            {lessonData.map((lesson: LessonPartType, index: number) => (
              <LessonPart
                key={lesson._id || index}
                title={lesson.type}
                complete={lesson.completed}
                minutes={"10"}
                task={"2"}
                theory={lesson.theory}
                onClickResult={() => handleClickResult(lesson.type)}
                onClickAccess={() => navigate(`/courses/${id}/quiz/${lesson._id}`)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetail
