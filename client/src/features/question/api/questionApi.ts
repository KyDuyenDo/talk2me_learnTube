import { api, handleApiError } from "../../../api/utils"

export const getQuestionsQuiz = async (lessonPartId: String) => {
    try {
        const response = await api.get(`api/question?lessonPartId=${lessonPartId}&type=quiz`)
        return response.data
    } catch (error) {
        return await handleApiError(error)
    }
}