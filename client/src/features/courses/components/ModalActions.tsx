import LoadingSpinner from "../../../components/LoadingSpinner"
import type { VideoInfo } from "../types"


interface ModalActionsProps {
  onClose: () => void
  isSubmitting: boolean
  videoInfo: VideoInfo | null
}

export const ModalActions = ({ onClose, isSubmitting, videoInfo }: ModalActionsProps) => (
  <div className="flex gap-3 pt-4 border-t border-gray-200">
    <button
      type="button"
      onClick={onClose}
      disabled={isSubmitting}
      className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      Cancel
    </button>
    <button
      type="submit"
      disabled={isSubmitting || !videoInfo}
      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
    >
      {isSubmitting && <LoadingSpinner size="sm" />}
      <span className={isSubmitting ? "ml-2" : ""}>{isSubmitting ? "Creating..." : "Create Course"}</span>
    </button>
  </div>
)
