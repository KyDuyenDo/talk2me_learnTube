import type { FunctionComponent } from "react";

interface CourseItemProps {

}

const CourseItem: FunctionComponent<CourseItemProps> = () => {
    return (
        <div className="flex flex-col border border-gray-300 rounded-md">
            <div className="header">
                <img src="" className="w-full h-[180px] object-cover" alt="Course Thumbnail" />
            </div>
            <div className="content">
                <span className="course-title text-[16px] font-[500] text-[#101828]">Course Title</span>
                <span className="course-description text-[14px] font-[400] text-[#606070]">Course Description</span>
            </div>
        </div>
    );
}

export default CourseItem;