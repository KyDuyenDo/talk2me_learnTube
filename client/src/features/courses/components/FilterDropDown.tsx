import { useEffect, useRef, useState, type FunctionComponent } from "react";
import { CheckIcon, ChevronDown } from "../../../utils/constant/icon";

export type DropDownItem = {
    label: string
    value: string
    active: false
    count?: number
}

type UserProfileProps = {
    items: DropDownItem[]
};

const FilterDropDown: FunctionComponent<UserProfileProps> = ({ items }) => {
    const [showDropDown, setShowDropDown] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null);
    const [selectedDropDownItem, setSelectedDropDownItem] = useState<DropDownItem[]>([])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setShowDropDown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [])

    const handleClickItem = (item: DropDownItem) => {
        setSelectedDropDownItem(prev => {
            const exists = prev.some(i => i.value === item.value)
            if (exists) {
                return prev.filter(i => i.value !== item.value)
            } else {
                return [...prev, item]
            }
        })
    }


    return (
        <div className="relative flex justify-center items-center" ref={containerRef}>
            <button onClick={() => setShowDropDown(!showDropDown)} className="flex flex-row gap-2 items-center">
                <span className="font-[700] text-[#1b1f2e]">Category</span>
                <ChevronDown />
                {
                    selectedDropDownItem.map((item) => (<span>{item.label}</span>))
                }
            </button>
            {
                showDropDown && (
                    <div className="absolute z-50 transition-all duration-500 right-0 top-[40px] p-4 min-w-[272px] max-h-[316px] overflow-auto border-2 border-[#e6e6eb] rounded-md bg-white">
                        <ul className="space-y-2">
                            {
                                items.map((item, index) => {
                                    const isChecked = selectedDropDownItem.some(i => i.value === item.value)

                                    return (
                                        <li
                                            key={index}
                                            className="flex justify-between items-center px-4 py-2 rounded-md hover:bg-gray-100 cursor-pointer"
                                        >
                                            <div className="flex items-center">
                                                <div className="relative">
                                                    <input
                                                        type="checkbox"
                                                        id={`checkbox-${index}`}
                                                        checked={isChecked}
                                                        onChange={() => handleClickItem(item)}
                                                        className="
                                                            w-5 h-5 
                                                            appearance-none 
                                                            border-2 border-[#b5b7bd] rounded
                                                            checked:bg-[#1b1f2e]
                                                            checked:border-[#1b1f2e]
                                                            flex items-center justify-center
                                                            relative
                                                            "
                                                    />
                                                    {isChecked && (
                                                        <div className="absolute top-[1px] right-[1px] w-4.5 h-4.5 bg-transparent pointer-events-none">
                                                            <CheckIcon size={"4"} />
                                                        </div>
                                                    )}
                                                </div>
                                                <label
                                                    htmlFor={`checkbox-${index}`}
                                                    className="ml-3 text-[16px] font-[400] cursor-pointer"
                                                >
                                                    {item.label}
                                                </label>
                                            </div>
                                            <span>{item.count}</span>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>

                )
            }
        </div>
    );
}

export default FilterDropDown;