import { useQuery } from "@tanstack/react-query"
import { getLessonPart } from "../api/lessonPartApi"
export const lessonPartKeys = {
    all: ["lessonParts"] as const,
    lists: () => [...lessonPartKeys.all, "list"] as const,
    list: () => [...lessonPartKeys.lists()] as const,
}

export const useGetLessonParts = (courseId: String) => {
    return useQuery({
        queryKey: lessonPartKeys.list(),
        queryFn: () => getLessonPart(courseId),
        staleTime: 1000 * 60 * 10,
    })
}