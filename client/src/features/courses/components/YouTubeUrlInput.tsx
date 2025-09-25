import { Controller } from "react-hook-form"
import type { Control, FieldErrors } from "react-hook-form"
import type { FormData } from "../types"
import LoadingSpinner from "../../../components/LoadingSpinner"
import ErrorMessage from "../../../components/ErrorMessage"

interface YouTubeUrlInputProps {
  control: Control<FormData>
  errors: FieldErrors<FormData>
  isLoading: boolean
}

export const YouTubeUrlInput = ({ control, errors, isLoading }: YouTubeUrlInputProps) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">YouTube URL *</label>
    <div className="relative">
      <Controller
        name="youtubeUrl"
        control={control}
        rules={{ required: "YouTube URL is required" }}
        render={({ field }) => (
          <input
            {...field}
            type="url"
            placeholder="https://www.youtube.com/watch?v=..."
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.youtubeUrl ? "border-red-500" : "border-gray-300"
            }`}
          />
        )}
      />
      {isLoading && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <LoadingSpinner size="sm" />
        </div>
      )}
    </div>
    {errors.youtubeUrl && <ErrorMessage message={errors.youtubeUrl.message!} />}
  </div>
)
