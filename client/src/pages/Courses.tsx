import type { FunctionComponent } from "react";
import { SearchIcon } from "../utils/constant/icon";

interface CoursesPageProps {

}

const CoursesPage: FunctionComponent<CoursesPageProps> = () => {
    return (
        <div className="p-7">
            <div className="p-3">
                <div className="search">
                    <div className="relative h-[53px] w-[420px] border border-gray-300 rounded-md p-2">
                        <div className="absolute left-6 top-1/2 transform -translate-y-1/2">
                            <SearchIcon />
                        </div>
                        <input type="text" placeholder="Search courses..." className="w-full h-full outline-0 pl-[56px] text-[16px] font-[500] text-[#606070]" />
                    </div>
                </div>
                <div className="course-list">
                   
                </div>
            </div>
        </div>

    );
}

export default CoursesPage;