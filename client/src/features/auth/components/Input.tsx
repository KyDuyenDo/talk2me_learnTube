import React, { useState, useEffect, useRef, forwardRef } from "react"
import { EyeIcon, EyeOffIcon } from "../../../utils/constant/icon"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isObscure?: boolean
  error?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const [obscure, setObscure] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const internalRef = useRef<HTMLInputElement>(null)
  const inputRef = (ref as React.RefObject<HTMLInputElement>) || internalRef
  const [cursorPosition, setCursorPosition] = useState<number | null>(null)

  useEffect(() => {
    if (cursorPosition !== null && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.setSelectionRange(cursorPosition, cursorPosition)
        setCursorPosition(null)
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
      className={`flex items-center px-[var(--spacing-md)] rounded-[var(--border-radius-md)] bg-[var(--color-background)] border ${
        props.error
          ? "border-[var(--color-error)]"
          : "border-[var(--color-border)] focus-within:border-[var(--color-primary)]"
      }`}
    >
      <input
        ref={inputRef}
        type={props.isObscure && !obscure ? "password" : "text"}
        className="w-full outline-0 py-[var(--spacing-xs)] bg-transparent text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)]"
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props} // bao gồm {...register("fieldName")} từ React Hook Form
      />
      {props.isObscure && (
        <button
          type="button"
          className="hover:cursor-pointer"
          onMouseDown={(e) => e.preventDefault()}
          onClick={handleToggleObscure}
        >
          {obscure ? (
            <EyeIcon className={isFocused ? "!text-[var(--color-primary)]" : "text-[var(--color-text-muted)]"} />
          ) : (
            <EyeOffIcon className={isFocused ? "!text-[var(--color-primary)]" : "text-[var(--color-text-muted)]"} />
          )}
        </button>
      )}
    </div>
  )
})

Input.displayName = "Input"
export default Input
