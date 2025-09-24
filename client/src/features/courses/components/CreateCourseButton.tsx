import type { FunctionComponent } from "react"
// import { PlusIcon } from "../../../utils/constant/icon"

interface CreateCourseButtonProps {
  onClick: () => void
  disabled?: boolean
  variant?: "primary" | "secondary"
  size?: "sm" | "md" | "lg"
}

export const CreateCourseButton: FunctionComponent<CreateCourseButtonProps> = ({
  onClick,
  disabled = false,
  variant = "primary",
  size = "md",
}) => {
  const sizeClasses = {
    sm: "px-3 py-1.5 text-[length:var(--font-size-xs)]",
    md: "px-4 py-2 text-[length:var(--font-size-sm)]",
    lg: "px-6 py-3 text-[length:var(--font-size-base)]",
  }

  const variantClasses = {
    primary: "bg-[var(--color-primary)] text-white hover:opacity-90 focus:ring-[var(--color-primary)]",
    secondary:
      "bg-[var(--color-surface)] text-[var(--color-text-primary)] border-[var(--border-width-normal)] border-[var(--color-border)] hover:bg-[var(--color-border)] focus:ring-[var(--color-primary)]",
  }

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center gap-2 font-medium rounded-[var(--border-radius-md)] 
        focus:outline-none focus:ring-2 focus:ring-offset-2 
        disabled:opacity-50 disabled:cursor-not-allowed 
        transition-all duration-200
        ${sizeClasses[size]} 
        ${variantClasses[variant]}
      `}
    >
      {/* <PlusIcon className={iconSizes[size]} /> */}
      <div className={iconSizes[size]}>➕</div>
      Add Course
    </button>
  )
}

export default CreateCourseButton
