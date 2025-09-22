import type { FunctionComponent } from "react"
import type { Course, Category } from "../../../store/courseStore"
// import { BookOpenIcon, CheckCircleIcon, ClockIcon, TrendingUpIcon } from "../../../utils/constant/icon"

interface CourseStatsProps {
  courses: Course[]
  categories?: Category[]
}

export const CourseStats: FunctionComponent<CourseStatsProps> = ({ courses, categories }) => {
  const totalCourses = courses.length
  const completedCourses = courses.filter((course) => course.isCompleted || (course.progress || 0) >= 100).length
  const inProgressCourses = courses.filter(
    (course) => (course.progress || 0) > 0 && (course.progress || 0) < 100,
  ).length
  const averageProgress =
    totalCourses > 0 ? Math.round(courses.reduce((sum, course) => sum + (course.progress || 0), 0) / totalCourses) : 0

  const stats = [
    {
      label: "Total Courses",
      value: totalCourses,
      icon: <div>📚</div>, // BookOpenIcon,
      color: "text-[var(--color-primary)]",
      bgColor: "bg-blue-50",
    },
    {
      label: "Completed",
      value: completedCourses,
      icon: <div>✅</div>, // CheckCircleIcon,
      color: "text-[var(--color-success)]",
      bgColor: "bg-green-50",
    },
    {
      label: "In Progress",
      value: inProgressCourses,
      icon: <div>⏰</div>, // ClockIcon,
      color: "text-[var(--color-warning)]",
      bgColor: "bg-yellow-50",
    },
    {
      label: "Avg Progress",
      value: `${averageProgress}%`,
      icon: <div>📈</div>, // TrendingUpIcon,
      color: "text-[var(--color-accent)]",
      bgColor: "bg-purple-50",
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon

        return (
          <div
            key={index}
            className="bg-[var(--color-background)] border-[var(--border-width-normal)] border-[var(--color-border)] rounded-[var(--border-radius-lg)] p-[var(--spacing-lg)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[var(--font-size-sm)] text-[var(--color-text-secondary)] font-medium">
                  {stat.label}
                </p>
                <p className="text-[var(--font-size-2xl)] font-bold text-[var(--color-text-primary)] mt-1">
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-[var(--border-radius-lg)] ${stat.bgColor}`}>
                {/* <IconComponent className={`w-6 h-6 ${stat.color}`} /> */}
                <div className={`w-6 h-6 ${stat.color}`}>{IconComponent}</div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default CourseStats
