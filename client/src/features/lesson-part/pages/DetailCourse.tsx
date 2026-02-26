import { useState, useEffect, type FunctionComponent } from "react"
import LessonPart from "../components/LessonPart"
import { LeftIcon } from "../../../utils/constant/icon"
import { useNavigate, useParams } from "react-router-dom"
import { useGetLessonParts } from "../hooks/useLessonPartApi"
import LoadingSpinner from "../../../components/LoadingSpinner"
import ErrorMessage from "../../../components/ErrorMessage"
import { socket } from "../../../utils/socket"

type LessonPartType = {
  _id: string
  courseId: string
  type: string
  theory: string
  completed: boolean
  updateAt: string
}

const CourseDetail: FunctionComponent = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const {
    error,
    data: lessonData,
    isPending: isLoading,
    refetch: refetchLessonParts,
  } = useGetLessonParts(id || "")

  // IDs of lesson parts whose theory is still being generated
  const [pendingLessonIds, setPendingLessonIds] = useState<Set<string>>(new Set())
  // IDs of quiz lesson parts whose questions are still being generated
  const [pendingQuizIds, setPendingQuizIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    // Server emits this as soon as lesson parts are saved (before theory is ready)
    socket.on("lessonPartsCreated", (data: { courseId: string; lessonParts: { _id: string; type: string }[] }) => {
      if (data.courseId !== id) return
      const ids = data.lessonParts.map((lp) => lp._id)
      const quizIds = data.lessonParts.filter((lp) => lp.type === "quiz").map((lp) => lp._id)
      setPendingLessonIds(new Set(ids))
      setPendingQuizIds(new Set(quizIds))
      // Fetch the lesson parts now that they exist in DB
      refetchLessonParts()
    })

    // Theory has been written to all lesson parts
    socket.on("theoryGenerated", (data: { lessonParts: { _id: string }[] }) => {
      setPendingLessonIds(new Set())
      // Refresh so the theory text appears
      refetchLessonParts()
    })

    // Questions generated for one quiz lesson part
    socket.on("questionsGenerated", (data: { lessonPartId: string }) => {
      setPendingQuizIds((prev) => {
        const next = new Set(prev)
        next.delete(data.lessonPartId)
        return next
      })
    })

    return () => {
      socket.off("lessonPartsCreated")
      socket.off("theoryGenerated")
      socket.off("questionsGenerated")
    }
  }, [id])

  const handleClickResult = (lessonTitle: string) => {
    alert(`Xem kết quả cho ${lessonTitle}`)
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
        <ErrorMessage message={error.message} onRetry={refetchLessonParts} />
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
            {lessonData.map((lesson: LessonPartType, index: number) => {
              const isTheoryPending = pendingLessonIds.has(lesson._id)
              const isQuizPending = lesson.type === "quiz" && pendingQuizIds.has(lesson._id)

              return (
                <LessonPart
                  key={lesson._id || index}
                  title={lesson.type}
                  complete={lesson.completed}
                  minutes={"10"}
                  task={"2"}
                  theory={lesson.theory}
                  isTheoryPending={isTheoryPending}
                  isQuizPending={isQuizPending}
                  onClickResult={() => handleClickResult(lesson.type)}
                  onClickAccess={() => navigate(`/courses/${id}/quiz/${lesson._id}`)}
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetail
