import type { FunctionComponent } from "react"

interface ErrorAlertProps {
  text: string
}

const ErrorAlert: FunctionComponent<ErrorAlertProps> = (props) => {
  return (
    <div className="border-[var(--border-width-normal)] border-[var(--color-error)] py-2 px-9 text-[var(--font-size-base)] my-[10px] leading-6 rounded-[var(--border-radius-md)] text-center bg-red-50 text-[var(--color-error)]">
      {props.text}
    </div>
  )
}

export default ErrorAlert
