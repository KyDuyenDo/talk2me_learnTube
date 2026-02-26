import type { FunctionComponent } from "react"

interface PendingCourseCardProps {
    thumbnail: string
    title: string
}

/**
 * A ghost card shown in the grid while a course is being processed server-side.
 * Uses the real thumbnail + title captured at submit time so it looks familiar.
 */
export const PendingCourseCard: FunctionComponent<PendingCourseCardProps> = ({
    thumbnail,
    title,
}) => {
    return (
        <div className="bg-[var(--color-background)] rounded-[var(--border-radius-lg)] border [border-color:var(--color-border)] shadow-[var(--shadow-sm)] overflow-hidden cursor-not-allowed opacity-80">
            <div className="flex flex-col h-full">
                <div className="p-4 pb-0">
                    <div className="relative aspect-video overflow-hidden rounded-[var(--border-radius-md)] bg-gradient-to-br from-gray-100 to-gray-200">
                        <img
                            src={thumbnail || "/placeholder.svg?height=180&width=320"}
                            alt={title}
                            className="w-full h-full object-cover brightness-50 scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                        {/* Spinner overlay */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px]">
                            <div className="flex flex-col items-center gap-2">
                                <svg
                                    className="animate-spin w-9 h-9 text-white drop-shadow-lg"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                    />
                                    <path
                                        className="opacity-80"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                    />
                                </svg>
                                <span className="text-white text-xs font-semibold tracking-wide drop-shadow">
                                    Creating course…
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4 space-y-3 flex-1 flex flex-col">
                    <h3 className="font-semibold text-[var(--color-text-muted)] line-clamp-2 leading-tight text-base">
                        {title}
                    </h3>

                    <div className="flex items-center justify-between text-sm text-[var(--color-text-muted)] mt-auto">
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-2 bg-[var(--color-background)] rounded-full px-2 py-1 border border-[var(--color-border)]">
                                <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                                <span className="font-medium text-xs">Processing…</span>
                            </div>
                        </div>
                        <div className="text-xs font-medium text-amber-500 bg-amber-50 px-2 py-1 rounded-full border border-amber-200 animate-pulse">
                            Creating…
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PendingCourseCard
