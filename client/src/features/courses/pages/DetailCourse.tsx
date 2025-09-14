import type { FunctionComponent } from "react";
import LessonPart from "../components/LessonPart";

interface DetailCoursesProps {
    
}
 
const DetailCourses: FunctionComponent<DetailCoursesProps> = () => {
    return ( 
        <div>
            <LessonPart/>
        </div>
     );
}
 
export default DetailCourses;