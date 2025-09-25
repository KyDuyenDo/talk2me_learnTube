import { useState, useEffect, useRef } from "react"
import type { UseFormSetError, UseFormClearErrors, UseFormSetValue, UseFormWatch } from "react-hook-form"
import type { VideoInfo, FormData } from "../types"
import { useYouTubeInfo } from "./useCoursesApi"

const validateYouTubeUrl = (url: string): boolean => {
  const youtubeRegex =
    /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)[a-zA-Z0-9_-]{11}$/
  return youtubeRegex.test(url)
}

export const useYouTubeValidation = (
  youtubeUrl: string,
  setError: UseFormSetError<FormData>,
  clearErrors: UseFormClearErrors<FormData>,
  setValue: UseFormSetValue<FormData>,
  watch: UseFormWatch<FormData>,
) => {
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null)
  const { mutateAsync: youtubeInfoMutateAsync, isPending: isLoading } = useYouTubeInfo()

  const lastFetchedUrlRef = useRef<string>("")
  const fetchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (fetchTimeoutRef.current) {
      clearTimeout(fetchTimeoutRef.current)
    }

    const validateAndFetchVideoInfo = async () => {
      const url = youtubeUrl?.trim() || ""

      if (!url) {
        setVideoInfo(null)
        lastFetchedUrlRef.current = ""
        return
      }

      if (!validateYouTubeUrl(url)) {
        setError("youtubeUrl", {
          type: "manual",
          message: "Please enter a valid YouTube URL",
        })
        setVideoInfo(null)
        lastFetchedUrlRef.current = ""
        return
      }

      if (url === lastFetchedUrlRef.current) {
        return
      }

      clearErrors("youtubeUrl")
      lastFetchedUrlRef.current = url

      try {
        const info = await youtubeInfoMutateAsync(url)
        setVideoInfo(info)

        const currentTitle = watch("title")
        if (!currentTitle?.trim()) {
          setValue("title", info.title)
        }
      } catch (error) {
        setError("youtubeUrl", {
          type: "manual",
          message: "Failed to fetch video information",
        })
        setVideoInfo(null)
        lastFetchedUrlRef.current = ""
      }
    }

    fetchTimeoutRef.current = setTimeout(validateAndFetchVideoInfo, 500)

    return () => {
      if (fetchTimeoutRef.current) {
        clearTimeout(fetchTimeoutRef.current)
      }
    }
  }, [youtubeUrl, setError, clearErrors, setValue, watch, youtubeInfoMutateAsync])

  const resetVideoInfo = () => {
    setVideoInfo(null)
    lastFetchedUrlRef.current = ""
  }

  return {
    videoInfo,
    isLoading,
    resetVideoInfo,
  }
}
