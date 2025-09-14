import type { FunctionComponent } from "react";

interface FlashCardDetailProps {
    title: string
    onClick: () => void
}

const FlashCardDetail: FunctionComponent<FlashCardDetailProps> = (props) => {
    return (
        <a onClick={props.onClick} className="w-1/4 flex-shrink-0 px-2">
            <div className="relative bg-gray-200 rounded-md border border-gray-200 hover:shadow-md transition-shadow duration-200">
                <div className="p-6">
                    <div className="flex items-start justify-between">
                        <h3 className="text-[16px] font-[700] text-[#1b1f2e] leading-relaxed">{props.title}</h3>
                    </div>
                </div>
            </div>
        </a>
    );
}

export default FlashCardDetail;