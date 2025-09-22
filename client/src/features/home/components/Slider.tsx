import { useState, useEffect, useRef, type ReactNode } from "react"

interface SliderProps {
  children: ReactNode
  title: string
  onClickViewAll: () => void
  lengthView: number
}

export function Slider({ children, title, onClickViewAll, lengthView }: SliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(3)
  const [itemWidth, setItemWidth] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth >= 1280) {
        setItemsPerView(4)
      } else if (window.innerWidth >= 1024) {
        setItemsPerView(3)
      } else if (window.innerWidth >= 768) {
        setItemsPerView(2)
      } else {
        setItemsPerView(1)
      }
    }

    updateItemsPerView()
    window.addEventListener("resize", updateItemsPerView)
    return () => window.removeEventListener("resize", updateItemsPerView)
  }, [])

  useEffect(() => {
    const measureItems = () => {
      if (containerRef.current && itemsRef.current) {
        const container = containerRef.current
        const firstItem = itemsRef.current.children[0] as HTMLElement

        if (firstItem) {
          const containerRect = container.getBoundingClientRect()
          const itemRect = firstItem.getBoundingClientRect()

          setContainerWidth(containerRect.width)
          setItemWidth(itemRect.width + 16)
        }
      }
    }

    const timer = setTimeout(measureItems, 100)

    window.addEventListener("resize", measureItems)
    return () => {
      clearTimeout(timer)
      window.removeEventListener("resize", measureItems)
    }
  }, [itemsPerView, lengthView])

  const maxIndex = Math.max(0, lengthView - itemsPerView)

  const handlePrevious = () => {
    setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : maxIndex)
  }

  const handleNext = () => {
    setCurrentIndex(currentIndex < maxIndex ? currentIndex + 1 : 0)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const translateX = itemWidth > 0 ? -(currentIndex * itemWidth) : -(currentIndex * (100 / itemsPerView))
  const usePixelTransform = itemWidth > 0

  const totalPages = maxIndex + 1

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
            onClick={handlePrevious}
            disabled={totalPages <= 1 || currentIndex == 0}
            className="p-2 rounded-full border border-gray-300 hover:border-gray-400 transition-all duration-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            disabled={totalPages <= 1 || currentIndex == maxIndex}
            className="p-2 rounded-full border border-gray-300 hover:border-gray-400 transition-all duration-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="overflow-hidden" ref={containerRef}>
        <div
          ref={itemsRef}
          className="flex transition-transform duration-500 ease-in-out gap-4"
          style={{
            transform: usePixelTransform ? `translateX(${translateX}px)` : `translateX(${translateX}%)`,
          }}
        >
          {Array.from({ length: lengthView }).map((_, index) => (
            <div
              key={index}
              className="flex-shrink-0"
              style={{
                width: `calc(${100 / itemsPerView}% - ${(16 * (itemsPerView - 1)) / itemsPerView}px)`,
                minWidth: "280px",
              }}
            >
              {Array.isArray(children) ? children[index] : children}
            </div>
          ))}
        </div>
      </div>

      {/* {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-blue-600 w-6" : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      )} */}
    </div>
  )
}
