import { useQuery } from "@tanstack/react-query"
import { getQuestionsQuiz } from "../api/questionApi"
export const questionKeys = {
    all: ["questions"] as const,
    lists: () => [...questionKeys.all, "list"] as const,
    list: () => [...questionKeys.lists()] as const,
}

export const useQuestoinQuiz = (lessonPartId: String) => {
    return useQuery({
        queryKey: questionKeys.list(),
        queryFn: () => getQuestionsQuiz(lessonPartId),
        staleTime: 1000 * 60 * 10,
    })
}