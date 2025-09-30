import type React from "react"
import { useState, useEffect, useRef, forwardRef } from "react"
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
      className={`${props.error == true ? "border-2 border-red-600" : "border border-gray-400"} px-[12px] rounded-md hover:border-gray-700 focus-within:border-2 focus-within:!border-[#536dfe]`}
    >
      <div className="h-12 flex items-center">
        <input
          ref={inputRef}
          type={props.isObscure && !obscure ? "password" : "text"}
          className="w-full outline-0 py-[8px] [&::-ms-reveal]:hidden [&::-webkit-textfield-decoration-container]:hidden"
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        {props.isObscure && (
          <button
            type="button"
            className="hover:cursor-pointer"
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleToggleObscure}
          >
            {obscure ? (
              
              <EyeIcon className={isFocused ? "!text-[#536dfe]" : ""} />
            ) : (
              <EyeOffIcon className={isFocused ? "!text-[#536dfe]" : ""} />
            )}
          </button>
        )}
      </div>
    </div>
  )
})

Input.displayName = "Input"
export default Input
