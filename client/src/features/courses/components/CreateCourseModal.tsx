import type { FunctionComponent, RefObject } from "react"
import { ModalHeader } from "./ModalHeader"
import { YouTubeUrlInput } from "./YouTubeUrlInput"
import { VideoPreview } from "./VideoPreview"
import { CategorySelector } from "./CategorySelector"
import { ModalActions } from "./ModalActions"
import { useYouTubeValidation } from "../hooks/useYouTubeValidation"
import { useCourseForm } from "../hooks/useCourseForm"
import type { Category } from "../types"

interface CreateCourseModalProps {
  isOpen: boolean
  onClose: () => void
  categories: Category[]
  socketIdRef: RefObject<string>
  onPending: (youtubeUrl: string, info: { thumbnail: string; title: string }) => void
}

export const CreateCourseModal: FunctionComponent<CreateCourseModalProps> = ({
  isOpen,
  onClose,
  categories,
  socketIdRef,
  onPending,
}) => {
  const { form, showCreateCategory, setShowCreateCategory, isSubmitting, handleSubmit } =
    useCourseForm(isOpen)

  const { videoInfo, isLoading, resetVideoInfo } = useYouTubeValidation(
    form.watch("youtubeUrl"),
    form.setError,
    form.clearErrors,
    form.setValue,
    form.watch,
  )

  const handleClose = () => {
    resetVideoInfo()
    onClose()
  }

  const onSubmit = (data: any) => {
    handleSubmit(data, videoInfo, socketIdRef.current ?? "", handleClose, onPending)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose} />

      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <ModalHeader onClose={handleClose} />

        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-6">
          <YouTubeUrlInput control={form.control} errors={form.formState.errors} isLoading={isLoading} />

          {videoInfo && <VideoPreview videoInfo={videoInfo} />}

          <CategorySelector
            control={form.control}
            errors={form.formState.errors}
            categories={categories}
            showCreateCategory={showCreateCategory}
            setShowCreateCategory={setShowCreateCategory}
            setValue={form.setValue}
            clearErrors={form.clearErrors}
          />

          <ModalActions onClose={handleClose} isSubmitting={isSubmitting} videoInfo={videoInfo} />
        </form>
      </div>
    </div>
  )
}

export default CreateCourseModal
