import { useState, type ReactNode } from "react"
import { LeftIcon, RightIcon } from "../../../utils/constant/icon"

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
        <div className="w-full min-h-[150px]">
            <div className="flex items-center justify-between mb-7">
                <div className="flex">
                    <span className="text-[24px] font-[700] leading-[24px] text-[#1b1f2e]">{title}</span>
                    <a onClick={onClickViewAll} className="text-blue-600 text-[16px] font-[700] ml-8">
                        View all
                    </a>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleNext}
                        className="rounded-full border-gray-300 hover:border-gray-400 transition-all duration-300 bg-transparent"
                    >
                        {
                            isAtEnd ? <LeftIcon /> : <RightIcon />
                        }
                    </button>
                </div>
            </div>

            <div className="overflow-hidden">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(${translateX}%)` }}
                >
                    {children}
                </div>
            </div>
        </div>
    )
}
