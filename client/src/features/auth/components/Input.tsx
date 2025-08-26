import { useEffect, useRef, useState, type FunctionComponent } from "react";
import { EyeIcon, EyeOffIcon } from "../../../utils/constant/icon";

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
        <div className={`${props.error == true ? 'border-2 border-red-600' : 'border border-gray-400'} px-[12px] rounded-md hover:border-gray-700 focus-within:border-2 focus-within:!border-[#536dfe]`}>
            <div className="h-12 flex items-center">
                <input
                    ref={inputRef}
                    type={props.isObscure && !obscure ? "password" : "text"}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    value={props.value}
                    className="w-full outline-0 py-[8px] [&::-ms-reveal]:hidden [&::-webkit-textfield-decoration-container]:hidden"
                    onChange={props.onChange}
                />
                {props.isObscure && (
                    <button type="button" className="hover:cursor-pointer" onMouseDown={(e) => e.preventDefault()} onClick={handleToggleObscure}>
                        {obscure === true ? (
                            <EyeIcon className={isFocused ? "!text-[#536dfe]" : ""} />
                        ) : (
                            <EyeOffIcon className={isFocused ? "!text-[#536dfe]" : ""} />
                        )}
                    </button>
                )}
            </div>
        </div>
    )
}

export default Input;