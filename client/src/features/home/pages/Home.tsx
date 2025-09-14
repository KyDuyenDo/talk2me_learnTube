import type { FunctionComponent } from "react";
import { Slider } from "../components/Slider";
import { CourseCard } from "../../courses/components/CourseCard";
import { sampleCourses } from "../../courses/pages/Courses";
import FlashCardDetail from "../components/FlashCardDetail";
import CourseDetail from "../components/CourseDetail";

const HomePage: FunctionComponent = () => {
    const itemsDetail = ["item1", "item2", "item3", "item4", "item5", "item6", "item7", "item8", "item9"]
    return (
        <div className="p-7">
            <div className="p-3">
                <div className="flex items-center mb-7">
                    <Slider
                        title="Flash Card"
                        onClickViewAll={() => (window.location.href = "/courses")}
                        lengthView={sampleCourses.length}
                        itemsPerView={4}
                    >
                        {sampleCourses.map((course) => (
                            <div key={course.id} className="w-1/4 flex-shrink-0">
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
                        itemsPerView={4}
                    >
                        {sampleCourses.map((course) => (
                            <div key={course.id} className="w-1/4 flex-shrink-0">
                                <CourseCard course={course} />
                            </div>
                        ))}
                    </Slider>
                </div>
                 <Slider onClickViewAll={() => { }} title="Courses" lengthView={itemsDetail.length} itemsPerView={4} >
                        {itemsDetail.map((item, index) => (
                            <CourseDetail onClick={() => { }} title={item} key={index} />
                        ))}
                    </Slider>
                <div></div>
            </div>
        </div>
    );
}

export default HomePage;