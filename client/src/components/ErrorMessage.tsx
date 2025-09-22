import type { FunctionComponent } from "react"

interface ErrorMessageProps {
  message: string
  onRetry?: () => void
  className?: string
}

const ErrorMessage: FunctionComponent<ErrorMessageProps> = ({ message, onRetry, className = "" }) => {
  return (
    <div
      className={`bg-red-50 border-[var(--border-width-normal)] border-[var(--color-error)] rounded-[var(--border-radius-md)] p-[var(--spacing-lg)] ${className}`}
    >
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-[var(--color-error)]" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3 flex-1">
          <p className="text-[var(--font-size-sm)] text-[var(--color-error)]">{message}</p>
        </div>
        {onRetry && (
          <div className="ml-4">
            <button
              onClick={onRetry}
              className="text-[var(--font-size-sm)] font-medium text-[var(--color-error)] hover:text-red-800 focus:outline-none focus:underline"
            >
              Try again
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ErrorMessage
