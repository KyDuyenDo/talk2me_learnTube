import type { FunctionComponent } from "react";
import { Slider } from "../components/Slider";
import { CourseCard } from "../../courses/components/CourseCard";
import { sampleCourses } from "../../courses/pages/Courses";
import FlashCardDetail from "../components/FlashCardDetail";

const HomePage: FunctionComponent = () => {
    return (
        <div className="p-7">
            <div className="p-3">
                <div className="flex items-center mb-7">
                    <Slider
                        title="Flash Card"
                        onClickViewAll={() => (window.location.href = "/courses")}
                        lengthView={sampleCourses.length}
                    >
                        {sampleCourses.map((course) => (
                            <div key={course.id}>
                                <FlashCardDetail onClick={() => { }} title={course.title} />
                            </div>
                        ))}
                    </Slider>
                </div>
                <div className="flex items-center mb-7">
                    <Slider
                        title="Courses"
                        onClickViewAll={() => (window.location.href = "/courses")}
                        lengthView={sampleCourses.length}
                    >
                        {sampleCourses.map((course) => (
                            <div key={course.id}>
                                <CourseCard course={course} />
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
}

export default HomePage;