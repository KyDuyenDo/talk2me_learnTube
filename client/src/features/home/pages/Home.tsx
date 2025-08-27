import type { FunctionComponent } from "react";
import { Slider } from "../components/Slider";
import FlashCardDetail from "../components/FlashCardDetail";
import CourseDetail from "../components/CourseDetail";

interface HomePageProps {

}
const ieltsData = [
    { id: 1, title: "IELTS Speaking #2 – Age, Gadgets", locked: true },
    { id: 2, title: "IELTS Speaking #3 – TV, Business", locked: true },
    { id: 3, title: "#1 Part 1 – Money", locked: true },
    { id: 4, title: "#2 Part 1 – Age", locked: true },
    { id: 5, title: "IELTS Speaking #4 – Travel, Food", locked: true },
    { id: 6, title: "IELTS Speaking #5 – Work, Study", locked: true },
    { id: 7, title: "#3 Part 1 – Family", locked: true },
    { id: 8, title: "#4 Part 1 – Hobbies", locked: true },
]

const HomePage: FunctionComponent<HomePageProps> = () => {
    return (
        <div className="px-7">
            <div>
                <Slider title="Flash Card" onClickViewAll={() => { }} lengthView={ieltsData.length} itemsPerView={4}>
                    {
                        ieltsData.map((item) => (
                            <FlashCardDetail title={item.title} onClick={() => { }} />
                        ))
                    }
                </Slider>
            </div>
            <div className="my-[40px]"></div>
            <div>
                <Slider title="Courses" onClickViewAll={() => { }} lengthView={ieltsData.length} itemsPerView={4}>
                    {
                        ieltsData.map((item) => (
                            <CourseDetail title={item.title} onClick={() => { }} />
                        ))
                    }
                </Slider>
            </div>
        </div>
    );
}

export default HomePage;