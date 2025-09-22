import type { FunctionComponent } from "react";
import LessonPart from "../components/LessonPart";

interface DetailCoursesProps {

}

const lessonData = [
    {
        title: "Lesson 1: Introduction",
        complete: true,
        minutes: "10",
        task: "3",
        theory: `
### Theory Content

This is the theory section content. It contains important information about the lesson that students need to understand.

- Key concept 1
- Key concept 2
- Key concept 3
    `
    },
    {
        title: "Lesson 1: Introduction",
        complete: true,
        minutes: "10",
        task: "3",
        theory: `
### Theory Content

This is the theory section content. It contains important information about the lesson that students need to understand.

- Key concept 1
- Key concept 2
- Key concept 3
    `
    }
];


const DetailCourses: FunctionComponent<DetailCoursesProps> = () => {
    const handleClickResult = (lessonTitle: string) => {
        alert(`You clicked Result for ${lessonTitle}`);
    };

    const handleClickAccess = (lessonTitle: string) => {
        alert(`You clicked Access for ${lessonTitle}`);
    };

    return (
        <div className="p-6 space-y-6">
            {lessonData.map((lesson, index) => (
                <LessonPart
                    key={index}
                    title={lesson.title}
                    complete={lesson.complete}
                    minutes={lesson.minutes}
                    task={lesson.task}
                    theory={lesson.theory}
                    onClickResult={() => handleClickResult(lesson.title)}
                    onClickAccess={() => handleClickAccess(lesson.title)}
                />
            ))}
        </div>
    );
}

export default DetailCourses;
