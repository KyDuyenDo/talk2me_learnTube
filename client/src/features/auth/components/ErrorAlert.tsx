import type { FunctionComponent } from "react";

interface ErrorAlertProps {
    text: string
}

const ErrorAlert: FunctionComponent<ErrorAlertProps> = (props) => {
    return (
        <div className="border-2 border-[#ff0000] py-2 px-9 text-[16px] my-[10px] leading-6 rounded-md text-center">
            {props.text}
        </div>
    );
}

export default ErrorAlert;