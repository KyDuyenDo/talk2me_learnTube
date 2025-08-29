import type { FunctionComponent } from "react";
import { Slider } from "../components/Slider";
import { CourseCard } from "../../courses/components/CourseCard";
import { sampleCourses } from "../../courses/pages/Courses";

const HomePage: FunctionComponent = () => {
    return (
        <div className="p-7">
            <div className="p-3">
                <div className="flex items-center mb-7">
                    <Slider
                        title="Khóa Học Nổi Bật"
                        onClickViewAll={() => (window.location.href = "/courses")}
                        lengthView={sampleCourses.length}
                        itemsPerView={4}
                    >
                        {sampleCourses.map((course) => (
                            <div key={course.id} className="w-1/4 flex-shrink-0 px-0">
                                <CourseCard course={course} />
                            </div>
                        ))}
                    </Slider>
                </div>
                <div></div>
            </div>
        </div>
    );
}

export default HomePage;