interface Course {
  id: string
  title: string
  channel: string
  thumbnail: string
  videoUrl: string
}

interface CourseCardProps {
  course: Course,
  onClick?: () => void
}

export function CourseCard({ course, onClick }: CourseCardProps) {
  return (
    <a onClick={onClick} className="cursor-pointer bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      <div className="flex flex-col">
        <div className="relative aspect-video overflow-hidden">
          <img src={course.thumbnail || "/placeholder.svg"} alt={course.title} className="object-cover" />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="p-3 space-y-2">
          <h3 className="font-medium text-gray-900 line-clamp-2 leading-snug text-sm">{course.title}</h3>
          <p className="text-xs text-gray-600 mt-1">{course.channel}</p>
        </div>
      </div>
    </a>
  )
}
