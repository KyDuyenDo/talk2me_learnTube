import type React from "react"

import { useState } from "react"
import { sampleCourses } from "../pages/Courses"
import { CourseCard } from "./CourseCard"
import { Pagination } from "./Pagination"
import { CourseFolder } from "./CourseFolder"
import FilterDropDown, { type DropDownItem } from "./FilterDropDown"

type ViewMode = "grid" | "folders"

const Search = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
    </svg>
)

const Grid = () => (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
        />
    </svg>
)

const FolderOpen = () => (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
        />
    </svg>
)

const Button = ({
    children,
    onClick,
    variant = "default",
    size = "default",
    className = "",
}: {
    children: React.ReactNode
    onClick?: () => void
    variant?: "default" | "outline"
    size?: "default" | "sm"
    className?: string
}) => {
    const baseClasses =
        "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
    const variantClasses =
        variant === "outline"
            ? "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
            : "bg-primary text-primary-foreground hover:bg-primary/90"
    const sizeClasses = size === "sm" ? "h-8 px-3 text-xs" : "h-10 px-4 py-2"

    return (
        <button className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`} onClick={onClick}>
            {children}
        </button>
    )
}

const Input = ({
    type = "text",
    placeholder,
    value,
    onChange,
    className = "",
}: {
    type?: string
    placeholder?: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    className?: string
}) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        />
    )
}

export function CourseGridWithPagination() {
    const [searchTerm, setSearchTerm] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [viewMode, setViewMode] = useState<ViewMode>("grid")
    const itemsPerPage = 9

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

    // Group courses by category for folder view
    const coursesByCategory = filteredCourses.reduce(
        (acc, course) => {
            if (!acc[course.category]) {
                acc[course.category] = []
            }
            acc[course.category].push(course)
            return acc
        },
        {} as Record<string, typeof sampleCourses>,
    )

    const handleCourseClick = (course: (typeof sampleCourses)[0]) => {
        window.open(course.videoUrl, "_blank")
    }

    // Reset to page 1 when search changes
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
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">Course Library</h1>
                <p className="text-muted-foreground">Discover and learn from our comprehensive collection of courses</p>
            </div>

            <div className="mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="relative max-w-md w-full">
                    {/* <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" /> */}
                    <Input
                        type="text"
                        placeholder="Search courses, channels, or categories..."
                        value={searchTerm}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className="pl-10"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <FilterDropDown items={getCategories()} />
                </div>
            </div>

            <div className="mb-6">
                <p className="text-sm text-muted-foreground">
                    {filteredCourses.length} course{filteredCourses.length !== 1 ? "s" : ""} found
                    {searchTerm && ` for "${searchTerm}"`}
                </p>
            </div>

            {filteredCourses.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {paginatedCourses.map((course) => (
                            <CourseCard key={course.id} course={course} onClick={() => handleCourseClick(course)} />
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

                    <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                        <Search />
                    </div>
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
