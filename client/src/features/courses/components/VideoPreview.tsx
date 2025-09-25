import type { VideoInfo } from "../types"


interface VideoPreviewProps {
  videoInfo: VideoInfo
}

export const VideoPreview = ({ videoInfo }: VideoPreviewProps) => (
  <div className="bg-gray-50 rounded-lg p-4">
    <div className="flex gap-4">
      <img
        src={videoInfo.thumbnail || "/placeholder.svg"}
        alt={videoInfo.title}
        className="w-32 h-18 object-cover rounded"
      />
      <div className="flex-1">
        <h4 className="font-medium mb-1 text-gray-900">{videoInfo.title}</h4>
        <p className="text-sm text-gray-600 mb-2">{videoInfo.channel}</p>
      </div>
    </div>
  </div>
)
