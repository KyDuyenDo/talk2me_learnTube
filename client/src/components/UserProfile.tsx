import { useEffect, useRef, useState, type FunctionComponent } from "react"
import { UserIcon } from "../utils/constant/icon"

type UserProfileProps = Record<string, never>

const UserProfile: FunctionComponent<UserProfileProps> = () => {
  const [showDropDown, setShowDropDown] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const dropDownItem = ["Profile", "Logout"]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowDropDown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative flex justify-center items-center" ref={containerRef}>
      <p className="w-5 text-[var(--font-size-xs)] font-bold text-[var(--color-text-secondary)]">Ky</p>
      <button onClick={() => setShowDropDown(!showDropDown)}>{<UserIcon />}</button>
      {showDropDown && (
        <div className="absolute z-50 transition-all duration-500 right-0 top-[64px] p-4 min-w-[240px] border-[var(--border-width-normal)] border-[var(--color-border)] bg-[var(--color-background)] rounded-[var(--border-radius-md)] shadow-[var(--shadow-md)]">
          {dropDownItem.map((item, index) => (
            <p
              key={index}
              className={`${index == 0 ? "pt-[12px] pb-[24px]" : "pb-[12px]"} pl-[16px] text-[var(--font-size-base)] font-normal hover:cursor-pointer text-[var(--color-text-primary)] hover:text-[var(--color-primary)]`}
            >
              {item}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}

export default UserProfile
