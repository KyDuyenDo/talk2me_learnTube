import type { FunctionComponent } from "react";

interface CourseDetailProps {
    title: string
    onClick: () => void
}

const CourseDetail: FunctionComponent<CourseDetailProps> = (props) => {
    return (
        <a onClick={props.onClick} className="w-1/4 flex-shrink-0 px-2 ">
            <div className="bg-gray-300 rounded-md p-6">
                <div className="hero">
                    <img width={120} height={120} src="https://storage.googleapis.com/smalltalk2/assets/tvshow_s.png" />
                </div>
                <div className="content mt-7">
                    <span className="slide-title text-[#1b1f2e] text-[16px] font-[700]">
                        {props.title}
                    </span>
                </div>
            </div>
        </a>
    );
}

export default CourseDetail;