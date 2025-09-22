import { sampleCourses } from "../../courses/pages/Courses"
import { Slider } from "../components/Slider"

export default function HomePage() {

  const courseCards = sampleCourses.map((course, i) => (
    <div
      key={i}
      className="bg-white rounded-lg overflow-hidden transition-shadow h-full"
    >
      <div className="relative">
        <img src={course.thumbnail || "/placeholder.svg"} alt={course.title} className="w-full h-36 object-cover" />
      </div>
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">{course.title}</h3>
        <p className="text-xs text-gray-600">{course.channel}</p>
      </div>
    </div>
  ))

  return (
    <main className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg p-6">
        <Slider
          title="Courses"
          lengthView={sampleCourses.length}
          onClickViewAll={() => console.log("View all courses clicked")}
        >
          {courseCards}
        </Slider>
      </div>

      <div className="bg-white rounded-lg p-6 mt-8">
        <Slider
          title="Popular Courses"
          lengthView={sampleCourses.length + 1}
          onClickViewAll={() => console.log("View all popular courses clicked")}
        >
          {courseCards}
        </Slider>
      </div>
    </main>
  )
}
