import { useState } from "react"
import { CourseCard } from "../components/CourseCard"
import { useNavigate } from "react-router-dom"


export const sampleCourses = [
    {
        id: "1",
        title: "Learn Git – Full Course for Beginners",
        channel: "freeCodeCamp.org",
        thumbnail: "https://img.youtube.com/vi/zTjRZNkhiEU/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/watch?v=zTjRZNkhiEU",
        category: "Development Tools",
    },
    {
        id: "2",
        title: "Fastest Way to Learn AWS for Complete Beginners (2025)",
        channel: "Tech With Soleyman",
        thumbnail: "https://img.youtube.com/vi/gB00e15sUqc/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/watch?v=gB00e15sUqc",
        category: "Cloud Computing",
    },
    {
        id: "3",
        title: "GitHub for AI Engineers (beginner-friendly guide)",
        channel: "The Data Entrepreneurs",
        thumbnail: "https://img.youtube.com/vi/enBm0jLXLZ4/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/watch?v=enBm0jLXLZ4",
        category: "Development Tools",
    },
    {
        id: "4",
        title: "Build and Deploy FullStack React App on AWS",
        channel: "Unspecified Channel (YouTube)",
        thumbnail: "https://img.youtube.com/vi/FHn8c4Rk_yo/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/watch?v=FHn8c4Rk_yo",
        category: "Web Development",
    },
    {
        id: "5",
        title: "Node JS Full Course 2024 | Complete Backend Development Course",
        channel: "Unspecified Channel (YouTube)",
        thumbnail: "https://img.youtube.com/vi/MIJt9H69QVc/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/watch?v=MIJt9H69QVc",
        category: "Web Development",
    },
    {
        id: "6",
        title: "Python Full Course for Beginners",
        channel: "Programming with Mosh",
        thumbnail: "https://img.youtube.com/vi/_uQrJ0TkZlc/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/watch?v=_uQrJ0TkZlc",
        category: "Programming Languages",
    },
    {
        id: "7",
        title: "Machine Learning Full Course - Learn Machine Learning",
        channel: "freeCodeCamp.org",
        thumbnail: "https://img.youtube.com/vi/7eh4d6sabA0/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/watch?v=7eh4d6sabA0",
        category: "AI & Machine Learning",
    },
    {
        id: "8",
        title: "Docker Crash Course for Absolute Beginners",
        channel: "TechWorld with Nana",
        thumbnail: "https://img.youtube.com/vi/pg19Z8LL06w/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/watch?v=pg19Z8LL06w",
        category: "DevOps",
    },
    {
        id: "9",
        title: "Kubernetes Explained in 15 Minutes",
        channel: "TechWorld with Nana",
        thumbnail: "https://img.youtube.com/vi/X48VuDVv0do/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/watch?v=X48VuDVv0do",
        category: "DevOps",
    },
    {
        id: "10",
        title: "React JS Full Course for Beginners | 2025",
        channel: "freeCodeCamp.org",
        thumbnail: "https://img.youtube.com/vi/bMknfKXIFA8/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/watch?v=bMknfKXIFA8",
        category: "Web Development",
    },
    {
        id: "11",
        title: "Learn TypeScript – Full Course for Beginners",
        channel: "freeCodeCamp.org",
        thumbnail: "https://img.youtube.com/vi/30LWjhZzg50/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/watch?v=30LWjhZzg50",
        category: "Programming Languages",
    },
    {
        id: "12",
        title: "C++ Programming Course - Beginner to Advanced",
        channel: "freeCodeCamp.org",
        thumbnail: "https://img.youtube.com/vi/vLnPwxZdW4Y/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/watch?v=vLnPwxZdW4Y",
        category: "Programming Languages",
    },
    {
        id: "13",
        title: "SQL Full Course - Learn SQL in 8 Hours",
        channel: "Programming with Mosh",
        thumbnail: "https://img.youtube.com/vi/HXV3zeQKqGY/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/watch?v=HXV3zeQKqGY",
        category: "Database",
    },
    {
        id: "14",
        title: "Introduction to Artificial Intelligence (AI)",
        channel: "Simplilearn",
        thumbnail: "https://img.youtube.com/vi/JMUxmLyrhSk/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/watch?v=JMUxmLyrhSk",
        category: "AI & Machine Learning",
    },
    {
        id: "15",
        title: "Java Full Course for Beginners",
        channel: "Bro Code",
        thumbnail: "https://img.youtube.com/vi/A74TOX803D0/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/watch?v=A74TOX803D0",
        category: "Programming Languages",
    },
    {
        id: "16",
        title: "HTML & CSS Full Course - Beginner to Pro",
        channel: "SuperSimpleDev",
        thumbnail: "https://img.youtube.com/vi/G3e-cpL7ofc/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/watch?v=G3e-cpL7ofc",
        category: "Web Development",
    },
    {
        id: "17",
        title: "Rust Programming Language Crash Course",
        channel: "Traversy Media",
        thumbnail: "https://img.youtube.com/vi/zF34dRivLOw/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/watch?v=zF34dRivLOw",
        category: "Programming Languages",
    },
    {
        id: "18",
        title: "Next.js Full Course for Beginners",
        channel: "freeCodeCamp.org",
        thumbnail: "https://img.youtube.com/vi/1WmNXEVia8I/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/watch?v=1WmNXEVia8I",
        category: "Web Development",
    },
    {
        id: "19",
        title: "React Native Full Course 2025",
        channel: "Programming with Mosh",
        thumbnail: "https://img.youtube.com/vi/0-S5a0eXPoc/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/watch?v=0-S5a0eXPoc",
        category: "Mobile Development",
    },
    {
        id: "20",
        title: "DevOps Full Course - Learn DevOps in 8 Hours",
        channel: "Edureka",
        thumbnail: "https://img.youtube.com/vi/j5Zsa_eOXeY/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/watch?v=j5Zsa_eOXeY",
        category: "DevOps",
    },
]

export function CourseGrid() {
    const [searchTerm, setSearchTerm] = useState("")
    const navigate = useNavigate()

    const filteredCourses = sampleCourses.filter((course) => {
        const matchesSearch =
            course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.channel.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesSearch
    })

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="mb-10">
                <div className="max-w-md">
                    <div className="relative">
                        <svg
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 h-14 text-base border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none"
                        />
                    </div>
                </div>
            </div>

            {filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredCourses.map((course) => (
                        <CourseCard onClick={() => {
                            navigate(`/courses/${course.id}`)
                        }} key={course.id} course={course} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 space-y-4">
                    <p className="text-xl text-gray-500">Not found</p>
                    <button
                        onClick={() => setSearchTerm("")}
                        className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                        Delete searching
                    </button>
                </div>
            )}
        </div>
    )
}
