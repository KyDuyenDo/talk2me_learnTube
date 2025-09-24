import { api, handleApiError } from "../../../api/utils"

export async function loginUser(formData: FormData) {
  try {
    const response = await api.post("api/user/signin", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return { error: null, data: response.data }
  } catch (error) {
    return await handleApiError(error)
  }
}

export async function registerUser(formData: FormData) {
  try {
    const response = await api.post("/api/user/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return { error: null, data: response.data }
  } catch (error) {
    return await handleApiError(error)
  }
}
