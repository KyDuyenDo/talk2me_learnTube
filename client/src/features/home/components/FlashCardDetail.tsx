import type { FunctionComponent } from "react"

interface Folder {
  id: string
  title: string
  description?: string
  cardCount: number
  color: string
  lastStudied?: Date
  isCompleted?: boolean
}

interface FolderCardProps {
  folder: Folder
  onClick?: () => void
}

export const FolderCard: FunctionComponent<FolderCardProps> = ({ folder, onClick }) => {
  const completionPercentage = folder.isCompleted ? 100 : 0

  return (
    <div className="bg-[var(--color-background)] rounded-[var(--border-radius-lg)] border-[var(--border-width-normal)] border-[var(--color-border)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-lg)] transition-all duration-300 overflow-hidden group cursor-pointer transform">
      <div className="flex flex-col h-full">
        <div
          className="relative p-6 pb-8"
          style={{ background: `linear-gradient(135deg, ${folder.color}15, ${folder.color}25)` }}
        >
          <div className="flex items-center justify-center mb-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110"
              style={{ backgroundColor: folder.color }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-white">
                <path
                  d="M10 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V8C22 6.89543 21.1046 6 20 6H12L10 4Z"
                  fill="currentColor"
                />
                <path d="M6 10H18M6 13H16M6 16H14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          <div className="absolute top-4 right-4 flex items-center gap-1">
            <div className="w-3 h-4 bg-white/20 rounded-sm transform rotate-12"></div>
            <div className="w-3 h-4 bg-white/30 rounded-sm transform rotate-6"></div>
            <div className="w-3 h-4 bg-white/40 rounded-sm"></div>
          </div>

          {folder.isCompleted && (
            <div className="absolute top-4 left-4">
              <div className="bg-[var(--color-success)] rounded-full p-1.5 shadow-lg">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path
                    d="M20 6L9 17L4 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          )}

          <button
            onClick={onClick}
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/10 backdrop-blur-sm"
          >
            <div className="bg-white/90 rounded-full p-3 shadow-xl transform scale-90 group-hover:scale-100 transition-transform duration-300">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-800">
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </button>
        </div>

        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-[var(--color-text-primary)] line-clamp-2 leading-tight text-lg mb-2">
              {folder.title}
            </h3>
            {/* {folder.description && (
              <p className="text-[var(--color-text-muted)] text-sm line-clamp-2 mb-3">{folder.description}</p>
            )} */}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[var(--color-text-muted)]">
                  <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M7 8H17M7 12H15M7 16H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span className="text-sm font-medium text-[var(--color-text-primary)]">{folder.cardCount}</span>
                <span className="text-xs text-[var(--color-text-muted)]">
                  {folder.cardCount === 1 ? "card" : "cards"}
                </span>
              </div>
            </div>

            {folder.lastStudied && (
              <div className="text-xs text-[var(--color-text-muted)]">
                {new Date(folder.lastStudied).toLocaleDateString()}
              </div>
            )}
          </div>

          {completionPercentage > 0 && (
            <div className="mt-3 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[var(--color-success)] transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FolderCard
