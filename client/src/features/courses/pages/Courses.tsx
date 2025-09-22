import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { CourseCard } from "../components/CourseCard"
import Button from "../components/Button"
import type { DropDownItem } from "../components/FilterDropDown"
import Input from "../components/Input"
import FilterDropDown from "../components/FilterDropDown"
import { Pagination } from "../../../components/Pagination"
import { Search } from "../../../components/SearchField"

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
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9
  const navigate = useNavigate()

  const filteredCourses = sampleCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.channel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })



  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedCourses = filteredCourses.slice(startIndex, startIndex + itemsPerPage)

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  const getCategories = () => {
    const map = new Map<string, number>();
    for (const item of sampleCourses) {
      if (map.has(item.category)) {
        map.set(item.category, map.get(item.category)! + 1)
      } else {
        map.set(item.category, 1)
      }
    }
    return Array.from(map.entries()).map(([key, value]) => {
      return {
        label: key,
        value: key,
        active: false,
        count: value
      };
    }) as DropDownItem[];
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8 flex flex-row justify-between">
      </div>

      <div className="mb-14 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative max-w-md w-full">
          <Search placeholder="Large size" onChange={(e) => handleSearchChange(e.target.value)} className="h-12 text-lg pl-12" />
        </div>

        <div className="flex items-center gap-2">
          <FilterDropDown items={getCategories()} />
        </div>
      </div>

      {filteredCourses.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedCourses.map((course) => (
              <CourseCard key={course.id} course={course} onClick={() => {
                navigate(`/courses/${course.id}`)
              }} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalItems={filteredCourses.length}
          />
        </>
      ) : (
        <div className="text-center py-16 space-y-4">
          <div>
            <p className="text-xl font-medium text-foreground mb-2">No courses found</p>
            <p className="text-muted-foreground mb-4">Try adjusting your search terms or browse all courses</p>
            <Button onClick={() => handleSearchChange("")} variant="outline">
              Clear Search
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
