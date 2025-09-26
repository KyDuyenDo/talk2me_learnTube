import { api, handleApiError } from "../../../api/utils"

export const getLessonPart = async (courseId: String) => {
    try {
        const response = await api.get(`api/lesson-part?courseId=${courseId}`)
        return response.data
    } catch (error) {
        return await handleApiError(error)
    }
}