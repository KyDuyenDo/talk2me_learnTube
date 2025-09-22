import type React from "react"

import { useEffect, useRef, useState, type FunctionComponent } from "react"
import { EyeIcon, EyeOffIcon } from "../../../utils/constant/icon"

interface InputProps {
  isObscure?: boolean
  validate?: () => boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
  value?: string
  error?: boolean
}

const Input: FunctionComponent<InputProps> = (props) => {
  const [obscure, setObscure] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [cursorPosition, setCursorPosition] = useState<number | null>(null)

  useEffect(() => {
    if (cursorPosition !== null && inputRef.current) {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.setSelectionRange(cursorPosition, cursorPosition)
          setCursorPosition(null)
        }
      }, 0)
    }
  }, [obscure, cursorPosition])

  const handleToggleObscure = () => {
    if (inputRef.current) {
      setCursorPosition(inputRef.current.selectionStart || 0)
    }
    setObscure(!obscure)
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true)
    props.onFocus?.(e)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false)
    props.onBlur?.(e)
  }

  return (
    <div
      className={`${props.error == true ? "border-[var(--border-width-normal)] border-[var(--color-error)]" : "border-[var(--border-width-thin)] border-[var(--color-border)]"} px-[var(--spacing-md)] rounded-[var(--border-radius-md)] hover:border-[var(--color-text-secondary)] focus-within:border-[var(--border-width-normal)] focus-within:!border-[var(--color-primary)] bg-[var(--color-background)]`}
    >
      <div className="h-12 flex items-center">
        <input
          ref={inputRef}
          type={props.isObscure && !obscure ? "password" : "text"}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={props.value}
          className="w-full outline-0 py-[var(--spacing-xs)] [&::-ms-reveal]:hidden [&::-webkit-textfield-decoration-container]:hidden text-[var(--color-text-primary)] bg-transparent placeholder-[var(--color-text-muted)]"
          onChange={props.onChange}
        />
        {props.isObscure && (
          <button
            type="button"
            className="hover:cursor-pointer"
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleToggleObscure}
          >
            {obscure === true ? (
              <EyeIcon className={isFocused ? "!text-[var(--color-primary)]" : "text-[var(--color-text-muted)]"} />
            ) : (
              <EyeOffIcon className={isFocused ? "!text-[var(--color-primary)]" : "text-[var(--color-text-muted)]"} />
            )}
          </button>
        )}
      </div>
    </div>
  )
}

export default Input
