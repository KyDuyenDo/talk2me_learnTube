/**
 * Utility functions for YouTube URL handling and video ID extraction
 */

/**
 * Extracts YouTube video ID from various YouTube URL formats
 */
export function extractYouTubeVideoId(url: string): string | null {
  if (!url) return null

  // Regular expression to match various YouTube URL formats
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match && match[1]) {
      return match[1]
    }
  }

  return null
}

/**
 * Validates if a URL is a valid YouTube URL
 */
export function validateYouTubeUrl(url: string): boolean {
  if (!url) return false

  try {
    const urlObj = new URL(url)
    const hostname = urlObj.hostname.toLowerCase()

    // Check if it's a YouTube domain
    const isYouTubeDomain =
      hostname === "youtube.com" ||
      hostname === "www.youtube.com" ||
      hostname === "youtu.be" ||
      hostname === "m.youtube.com"

    if (!isYouTubeDomain) return false

    // Check if we can extract a video ID
    const videoId = extractYouTubeVideoId(url)
    return videoId !== null && videoId.length > 0
  } catch {
    return false
  }
}

/**
 * Converts a YouTube URL to embed format
 */
export function getYouTubeEmbedUrl(url: string): string | null {
  const videoId = extractYouTubeVideoId(url)
  if (!videoId) return null

  return `https://www.youtube.com/embed/${videoId}`
}

/**
 * Gets YouTube thumbnail URL from video ID
 */
export function getYouTubeThumbnail(
  videoId: string,
  quality: "default" | "medium" | "high" | "standard" | "maxres" = "high",
): string {
  const qualityMap = {
    default: "default.jpg",
    medium: "mqdefault.jpg",
    high: "hqdefault.jpg",
    standard: "sddefault.jpg",
    maxres: "maxresdefault.jpg",
  }

  return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}`
}

/**
 * Formats duration from seconds to readable format (e.g., "1:23:45")
 */
export function formatDuration(seconds: number): string {
  if (!seconds || seconds < 0) return "0:00"

  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = Math.floor(seconds % 60)

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  } else {
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }
}
