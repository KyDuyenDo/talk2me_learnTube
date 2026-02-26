import { useState, useEffect, type FunctionComponent } from "react"
import type { YouTubeProps } from "react-youtube"
import YouTube from "react-youtube"
import { useQuestoinQuiz } from "../hooks/useQuestionApi"
import { useNavigate, useParams } from "react-router-dom"
import LoadingSpinner from "../../../components/LoadingSpinner"
import ErrorMessage from "../../../components/ErrorMessage"
import { LeftIcon } from "../../../utils/constant/icon"
import { extractYouTubeVideoId } from "../../../utils/youtube"
import { socket } from "../../../utils/socket"

export type Question = {
  _id: string
  lessonPartId: string
  type: string
  order: number
  prompt: string
  choices?: string[]
  correctIndex?: number
  referenceAnswer: string
  createdAt?: Date
}

const QuizPage: FunctionComponent = () => {
  const { qid } = useParams()
  const navigate = useNavigate()
  const { data, error, isPending: isLoading, refetch: refetchQuiz } = useQuestoinQuiz(qid || "")

  // Whether this quiz's questions are still being generated server-side
  const [questionsGenerating, setQuestionsGenerating] = useState(false)

  const questions = data?.questions
  const youtubeId = extractYouTubeVideoId(data?.youtubeUrl)

  useEffect(() => {
    socket.on("questionsGenerated", (payload: { lessonPartId: string }) => {
      if (payload.lessonPartId !== qid) return
      // Questions are ready — stop the loading state and refresh
      setQuestionsGenerating(false)
      refetchQuiz()
    })

    return () => {
      socket.off("questionsGenerated")
    }
  }, [qid])

  // If we load the quiz page and there are no questions yet, assume they're still generating
  useEffect(() => {
    if (!isLoading && (!questions || questions.length === 0)) {
      setQuestionsGenerating(true)
    } else {
      setQuestionsGenerating(false)
    }
  }, [isLoading, questions])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <LoadingSpinner size="lg" className="text-[var(--color-primary)] mb-4" />
          <p className="text-[var(--color-text-secondary)]">Loading quiz...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-8">
        <ErrorMessage message={error.message} onRetry={refetchQuiz} />
      </div>
    )
  }

  // Questions are still being generated — show a friendly waiting screen
  if (questionsGenerating) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-6 px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="relative">
            <svg
              className="animate-spin w-16 h-16 text-[#2e68ff]"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
              <path
                className="opacity-90"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Generating Your Quiz</h2>
          <p className="text-gray-500 max-w-sm">
            Our AI is preparing personalized questions for this lesson. This usually takes 20–60 seconds.
          </p>
          <div className="flex gap-1.5 mt-2">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-2 h-2 bg-[#2e68ff] rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-sm text-[var(--color-primary)] mt-4"
        >
          <LeftIcon />
          Back to lessons
        </button>
      </div>
    )
  }

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    event.target.pauseVideo()
  }

  const opts: YouTubeProps["opts"] = {
    height: "360",
    width: "640",
    playerVars: { autoplay: 1 },
  }

  return (
    <div className="h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="px-4 py-5 flex justify-between items-center flex-shrink-0">
        <div></div>
        <button className="px-4 py-2 bg-gray-100 rounded-lg text-center">
          <span className="text-base text-gray-900 font-bold">Tips and Tricks</span>
        </button>
        <button onClick={() => navigate(-1)} className="p-3 rounded-lg hover:bg-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Progress indicator */}
      <div className="flex justify-end px-4 py-4 flex-shrink-0">
        <div className="flex gap-2 px-3 py-2 bg-gray-100 text-gray-600 rounded-lg">
          <span>Total:</span>
          <span className="text-gray-900">1/{questions?.length ?? 0}</span>
          <span className="text-gray-900 font-bold">00:24:42</span>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 px-4 overflow-y-auto">
        <div className="max-w-6xl mx-auto pb-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* Video section */}
            <div className="space-y-4">
              <h1 className="text-2xl lg:text-3xl text-gray-900 font-bold leading-tight">
                Watch the video till 8:50 and answer the questions
              </h1>
              <div className="aspect-video w-full">
                <YouTube
                  videoId={youtubeId || ""}
                  opts={{ ...opts, width: "100%", height: "100%" }}
                  onReady={onPlayerReady}
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Questions section */}
            <div>
              <form className="space-y-6">
                {questions?.map((question: Question, index: number) => (
                  <div key={question._id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="mb-3 font-medium text-gray-900">
                      {index + 1}. {question.prompt}
                    </div>
                    <div className="space-y-2 pl-4">
                      {question.choices?.map((choice, choiceIndex) => (
                        <label key={choiceIndex} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name={`${question._id}-${choiceIndex}`}
                            value="true"
                            className="text-blue-600"
                          />
                          <span>{choice}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white px-4 py-3 flex-shrink-0">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="bg-red-500 text-white px-4 py-2 rounded-full font-medium">15:05</div>
          <button className="bg-gray-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors">
            Next ≫
          </button>
        </div>
      </div>
    </div>
  )
}

export default QuizPage
