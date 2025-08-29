
interface QuizResult {
  id: number
  question: string
  userAnswer: "True" | "False" | "Not given" | null
  correctAnswer: "True" | "False" | "Not given"
}

const quizResults: QuizResult[] = [
  {
    id: 1,
    question: "Stephanie would be unhappy to stretch her budget.",
    userAnswer: "True",
    correctAnswer: "False",
  },
  {
    id: 2,
    question: "She's looking for space and safe neighbourhood.",
    userAnswer: "False",
    correctAnswer: "True",
  },
  {
    id: 3,
    question: "She's going to move in with her husband, three kids, and 2 dogs.",
    userAnswer: "True",
    correctAnswer: "True",
  },
  {
    id: 4,
    question: "The first house has 3 living rooms.",
    userAnswer: null,
    correctAnswer: "False",
  },
  {
    id: 5,
    question: "Stephanie is going to cook in the kitchen as it's a chef's dream.",
    userAnswer: null,
    correctAnswer: "Not given",
  },
  {
    id: 6,
    question: "The house has a lot of outside features including a patio and a pool.",
    userAnswer: null,
    correctAnswer: "True",
  },
]

export default function QuizResults() {
  const correctAnswers = quizResults.filter((result) => result.userAnswer === result.correctAnswer).length
  const totalQuestions = quizResults.length

  const getAnswerStyle = (userAnswer: string | null, correctAnswer: string, option: string) => {
    if (userAnswer === option) {
      if (userAnswer === correctAnswer) {
        return "bg-green-100 border-green-500 text-green-700"
      } else {
        return "bg-red-100 border-red-500 text-red-700"
      }
    } else if (option === correctAnswer && userAnswer !== correctAnswer) {
      return "bg-green-100 border-green-500 text-green-700"
    }
    return "bg-white border-gray-200 text-gray-700"
  }

  const getIcon = (userAnswer: string | null, correctAnswer: string, option: string) => {
    if (userAnswer === option) {
      if (userAnswer === correctAnswer) {
        return "✓"
      } else {
        return "✗"
      }
    } else if (option === correctAnswer && userAnswer !== correctAnswer) {
      return "✓"
    }
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Episode 1. Find Me a Luxury Home</h1>
            <p className="text-sm text-gray-600 mt-1">Date: 28 Aug 2025</p>
          </div>
          <button className="flex items-center gap-2 bg-transparent">
            {/* <Share className="w-4 h-4" /> */}
            Share
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            {/* Instructions */}
            <div className="mb-6">
              <p className="text-gray-800 font-medium">Watch the video till 8:50 and answer the questions</p>
            </div>

            {/* Questions Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {quizResults.map((result) => (
                <div key={result.id} className="space-y-4">
                  <div className="mb-4">
                    <span className="text-sm font-medium text-gray-900">
                      {result.id}. {result.question}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {["True", "False", "Not given"].map((option) => (
                      <div
                        key={option}
                        className={`flex items-center justify-between p-3 rounded-lg border-2 transition-colors ${getAnswerStyle(result.userAnswer, result.correctAnswer, option)}`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                              result.userAnswer === option ? "border-current bg-current" : "border-gray-300"
                            }`}
                          >
                            {result.userAnswer === option && <div className="w-2 h-2 rounded-full bg-white"></div>}
                          </div>
                          <span className="font-medium">{option}</span>
                        </div>

                        {getIcon(result.userAnswer, result.correctAnswer, option) && (
                          <span className="text-lg font-bold">
                            {getIcon(result.userAnswer, result.correctAnswer, option)}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg">
                {/* <CheckCircle className="w-5 h-5 text-green-600" /> */}
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {correctAnswers}/{totalQuestions}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
