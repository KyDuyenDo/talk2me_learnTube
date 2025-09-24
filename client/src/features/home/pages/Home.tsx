
import CourseCard from "../../courses/components/CourseCard"
import FolderCard from "../components/FlashCardDetail"
import { Slider } from "../components/Slider"

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

const mockFolders = [
  {
    id: "1",
    title: "JavaScript Fundamentals",
    description: "Essential concepts and syntax for JavaScript programming",
    cardCount: 45,
    color: "#10B981",
    lastStudied: new Date("2024-01-15"),
    isCompleted: false,
  },
  {
    id: "2",
    title: "React Hooks",
    description: "Master useState, useEffect, and custom hooks",
    cardCount: 32,
    color: "#3B82F6",
    lastStudied: new Date("2024-01-20"),
    isCompleted: true,
  },
  {
    id: "3",
    title: "CSS Grid & Flexbox",
    description: "Modern layout techniques for responsive design",
    cardCount: 28,
    color: "#8B5CF6",
    lastStudied: new Date("2024-01-18"),
    isCompleted: false,
  },
  {
    id: "4",
    title: "Node.js Basics",
    description: "Server-side JavaScript and API development",
    cardCount: 38,
    color: "#F59E0B",
    lastStudied: new Date("2024-01-22"),
    isCompleted: false,
  },
  {
    id: "5",
    title: "Database Design",
    description: "SQL fundamentals and database optimization",
    cardCount: 52,
    color: "#EF4444",
    lastStudied: new Date("2024-01-19"),
    isCompleted: true,
  },
  {
    id: "6",
    title: "TypeScript Advanced",
    description: "Advanced types, generics, and best practices",
    cardCount: 41,
    color: "#06B6D4",
    lastStudied: new Date("2024-01-21"),
    isCompleted: false,
  },
]


export default function HomePage() {

  return (
    <main className="container mx-auto px-4 my-8 bg-gray-50 min-h-screen">
      <div className="p-6">
        <Slider
          title="Recent Flashcards"
          lengthView={mockFolders.length + 1}
          onClickViewAll={() => console.log("View all courses clicked")}
        >
          {mockFolders.map((folder) => (
            <FolderCard
              key={folder.id}
              folder={folder}
              onClick={() => console.log(`Opening folder: ${folder.title}`)}
            />
          ))}
        </Slider>
      </div>

      <div className="p-6">
        <Slider
          title="Recent Courses"
          lengthView={sampleCourses.length + 1}
          onClickViewAll={() => console.log("View all popular courses clicked")}
        >
          {
            sampleCourses.map((course, i) => (
              <CourseCard course={{ ...course, id: i.toString(), youtubeUrl: course.videoUrl, categoryId: course.category }} onClick={() => { }} />
            ))
          }
        </Slider>
      </div>
    </main>
  )
}
