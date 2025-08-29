import { useState, type ReactNode } from "react"

interface SliderProps {
  children: ReactNode
  title: string
  onClickViewAll: () => void
  lengthView: number
  itemsPerView: number
}

export function Slider({ children, title, onClickViewAll, lengthView, itemsPerView }: SliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const maxIndex = Math.max(0, lengthView - itemsPerView)
  const isAtEnd = currentIndex >= maxIndex

  const handleNext = () => {
    if (currentIndex >= maxIndex) {
      setCurrentIndex(0)
    } else {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const translateX = -(currentIndex * (100 / itemsPerView))

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-gray-900">{title}</span>
          <button onClick={onClickViewAll} className="text-blue-600 text-base font-semibold ml-6 hover:text-blue-700">
            View all
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleNext}
            className="p-2 rounded-full border border-gray-300 hover:border-gray-400 transition-all duration-300 bg-white hover:bg-gray-50"
          >
            {isAtEnd ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out gap-3"
          style={{ transform: `translateX(${translateX}%)` }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
