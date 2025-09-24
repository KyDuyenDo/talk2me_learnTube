import { useState, type FunctionComponent } from "react"
import { CheckIcon, ChevronDown, RightIcon } from "../../../utils/constant/icon"
import ReactMarkdown from "react-markdown"

type LessonPartProps = {
  title: string
  complete: boolean
  minutes: string
  task: string
  theory: string // markdown string
  onClickResult: () => void
  onClickAccess: () => void
}

const LessonPart: FunctionComponent<LessonPartProps> = ({
  title,
  complete,
  minutes,
  task,
  theory,
  onClickResult,
  onClickAccess,
}) => {
  const [openDropDown, setOpenDropDown] = useState(false)

  return (
    <div className="flex pb-6">
      {/* Icon */}
      <div className="min-w-24 flex justify-center items-center">
        <div className="p-2.5 bg-green-200 rounded-3xl">
          <div className="bg-green-500 p-0.5 rounded-2xl">
            <CheckIcon />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="min-h-40 w-full bg-gray-300 rounded-sm">
        <a onClick={() => onClickAccess()}>
          <div className="flex flex-row justify-between items-center px-3 py-2 mb-2">
            <div className="flex flex-col">
              <div className="px-3 py-3">
                <span className="text-2xl font-bold text-[#1b1f2e]">{title}</span>
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
              onClick={() => setOpenDropDown(!openDropDown)}
              className="col-span-4 font-[700] text-[#2e68ff] flex flex-row items-center"
            >
              <span>Theory</span>
              <span className="ml-1 mt-1">
                <ChevronDown color="text-[#2e68ff]" />
              </span>
            </button>

            {!openDropDown && (
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
            className={`transition-all duration-200 overflow-hidden ease-in-out  ${openDropDown
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
