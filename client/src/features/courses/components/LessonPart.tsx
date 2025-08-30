import { useState, type FunctionComponent } from "react"
import { CheckIcon } from "../../../utils/constant/icon"

type LessonPartProps = {}

const LessonPart: FunctionComponent<LessonPartProps> = () => {
  const [openDropDown, setOpenDropDown] = useState(false)
  return (
    <div className="flex pb-6">
      <div className="min-w-24 flex justify-center items-center">
        <div className="p-2.5 bg-green-200 rounded-3xl">
          <div className="bg-green-500 p-0.5 rounded-2xl">
            <CheckIcon />
          </div>
        </div>
      </div>
      <div className="min-h-40">
        <div className="flex flex-col">
          <div className="px-3 py-4">
            <span className="text-2xl font-bold text-[#1b1f2e]">1. Episode 1. Find Me a Luxury Home</span>
          </div>
          <div className="">
            <span className="px-4 text-xs font-medium">Complete</span>
            <span className="px-4 ml-10 text-xs font-medium">Minutes</span>
            <span className="px-4 ml-10 text-xs font-medium">2 tasks</span>
          </div>
        </div>
        <div className="mt-3">
          <div>
            <button
              onClick={() => setOpenDropDown(!openDropDown)}
              className=""
            >
              Theory
            </button>
          </div>
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              openDropDown
                ? "max-h-96 opacity-100 transform translate-y-0"
                : "max-h-0 opacity-0 transform -translate-y-2"
            }`}
          >
            <div className="pt-4 pb-2">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Theory Content</h3>
                <p className="text-gray-600 text-sm">
                  This is the theory section content. It contains important information about the lesson that students
                  need to understand.
                </p>
                <ul className="mt-3 space-y-1 text-sm text-gray-600">
                  <li>• Key concept 1</li>
                  <li>• Key concept 2</li>
                  <li>• Key concept 3</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LessonPart
