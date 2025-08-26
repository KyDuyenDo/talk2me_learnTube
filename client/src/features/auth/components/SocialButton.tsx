import type { FunctionComponent } from "react";

interface SocialButtonProps {
    icon?: string
    text?: string
    onClick?: () => void
}

const SocialButton: FunctionComponent<SocialButtonProps> = (props) => {
    return (
        <button
            type="button"
            onClick={props.onClick}
            className="hover:cursor-pointer bg-amber-100 w-[48%] h-14 rounded-[8px] text-[16px] font-[700] px-4 flex items-center justify-center"
        >
            <div className="w-10"><img width={28} height={28} src={props.icon} /></div>
            <p>{props.text}</p>
        </button>
    );
}

export default SocialButton;