import type { FunctionComponent } from "react";
import { Slider } from "../components/Slider";
import FlashCardDetail from "../components/FlashCardDetail";
import CourseDetail from "../components/CourseDetail";

const HomePage: FunctionComponent = () => {
    const itemsDetail = ["item1", "item2", "item3", "item4", "item5", "item6", "item7", "item8", "item9"]
    return (
        <div className="p-7">
            <div className="p-3">
                <div className="flex items-center mb-7">
                    <Slider onClickViewAll={() => { }} title="Flash Cards" lengthView={itemsDetail.length} itemsPerView={4} >
                        {itemsDetail.map((item, index) => (
                            <FlashCardDetail onClick={() => { }} title={item} key={index} />
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