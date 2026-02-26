import { useState, type FunctionComponent } from "react"
import { CheckIcon, ChevronDown, RightIcon } from "../../../utils/constant/icon"
import ReactMarkdown from "react-markdown"

type LessonPartProps = {
  title: string
  complete: boolean
  minutes: string
  task: string
  theory: string
  isTheoryPending?: boolean  // still generating theory text
  isQuizPending?: boolean    // still generating quiz questions
  onClickResult: () => void
  onClickAccess: () => void
}

const LessonPart: FunctionComponent<LessonPartProps> = ({
  title,
  complete,
  minutes,
  task,
  theory,
  isTheoryPending = false,
  isQuizPending = false,
  onClickResult,
  onClickAccess,
}) => {
  const [openDropDown, setOpenDropDown] = useState(false)

  // A lesson part is "pending" if either its theory or (if quiz) its questions are still loading
  const isPending = isTheoryPending || isQuizPending

  return (
    <div className={`flex pb-6 transition-opacity duration-300 ${isPending ? "opacity-50 pointer-events-none" : ""}`}>
      {/* Icon */}
      <div className="min-w-24 flex justify-center items-center">
        {isPending ? (
          <div className="p-2.5 bg-amber-100 rounded-3xl">
            <div className="bg-amber-400 p-0.5 rounded-2xl">
              {/* Pulsing clock icon while pending */}
              <svg
                className="animate-spin w-5 h-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            </div>
          </div>
        ) : (
          <div className="p-2.5 bg-green-200 rounded-3xl">
            <div className="bg-green-500 p-0.5 rounded-2xl">
              <CheckIcon />
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className={`min-h-40 w-full rounded-sm ${isPending ? "bg-gray-200" : "bg-gray-300"}`}>
        <a onClick={isPending ? undefined : () => onClickAccess()}>
          <div className="flex flex-row justify-between items-center px-3 py-2 mb-2">
            <div className="flex flex-col">
              <div className="px-3 py-3 flex items-center gap-3">
                <span className="text-2xl font-bold text-[#1b1f2e]">{title}</span>
                {isPending && (
                  <span className="text-xs font-semibold text-amber-600 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-full animate-pulse">
                    {isTheoryPending ? "Generating theory…" : "Generating questions…"}
                  </span>
                )}
              </div>
              <div>
                <span className="px-3 text-xs font-medium">Complete: {complete.toString()}</span>
                <span className="px-3 ml-10 text-xs font-medium">Minutes: {minutes}</span>
                <span className="px-3 ml-10 text-xs font-medium">{task} tasks</span>
              </div>
            </div>
            <RightIcon />
          </div>
        </a>

        <div className="h-0.5 bg-gray-400 w-full"></div>

        <div className="px-6 py-2.5">
          <div className="grid grid-cols-12">
            {/* Toggle Theory */}
            <button
              onClick={() => !isPending && setOpenDropDown(!openDropDown)}
              className={`col-span-4 font-[700] flex flex-row items-center ${isPending ? "text-gray-400 cursor-not-allowed" : "text-[#2e68ff]"
                }`}
            >
              <span>Theory</span>
              <span className="ml-1 mt-1">
                <ChevronDown color={isPending ? "text-gray-400" : "text-[#2e68ff]"} />
              </span>
            </button>

            {!openDropDown && !isPending && (
              <button
                onClick={onClickResult}
                className="col-span-8 font-[700] text-[#2e68ff] flex flex-row items-center"
              >
                <span>Result</span>
                <span className="ml-1 mt-1">
                  <RightIcon size="size-4" />
                </span>
              </button>
            )}
          </div>

          {/* Dropdown Content */}
          <div
            className={`transition-all duration-200 overflow-hidden ease-in-out ${openDropDown && !isPending
                ? "max-h-[50%] opacity-100 transform translate-y-0"
                : "max-h-0 opacity-0 transform -translate-y-2"
              }`}
          >
            <div className="mt-3 prose prose-sm prose-gray prose-h3:text-base prose-p:text-sm prose-li:text-sm">
              <ReactMarkdown>{theory}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LessonPart
