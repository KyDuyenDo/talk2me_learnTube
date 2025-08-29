import { CourseCard } from "../components/CourseCard"


// Sample data - in a real app, this would come from a database or API
export const sampleCourses = [
    {
        id: "1",
        title: "Learn Git – Full Course for Beginners",
        channel: "freeCodeCamp.org",
        thumbnail: "https://img.youtube.com/vi/zTjRZNkhiEU/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/watch?v=zTjRZNkhiEU",
    },
    {
        id: "2",
        title: "Fastest Way to Learn AWS for Complete Beginners (2025)",
        channel: "Tech With Soleyman",
        thumbnail: "https://img.youtube.com/vi/gB00e15sUqc/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/watch?v=gB00e15sUqc",
    },
    {
        id: "3",
        title: "GitHub for AI Engineers (beginner-friendly guide)",
        channel: "The Data Entrepreneurs",
        thumbnail: "https://img.youtube.com/vi/enBm0jLXLZ4/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/watch?v=enBm0jLXLZ4",
    },
    {
        id: "4",
        title: "Build and Deploy FullStack React App on AWS",
        channel: "Unspecified Channel (YouTube)",
        thumbnail: "https://img.youtube.com/vi/FHn8c4Rk_yo/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/watch?v=FHn8c4Rk_yo",
    },
    {
        id: "5",
        title: "Node JS Full Course 2024 | Complete Backend Development Course",
        channel: "Unspecified Channel (YouTube)",
        thumbnail: "https://img.youtube.com/vi/MIJt9H69QVc/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/watch?v=MIJt9H69QVc",
    },
];

export function CourseGrid() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
            {sampleCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
            ))}
        </div>
    )
}
