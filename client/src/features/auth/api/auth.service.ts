import { apiLogin, api, handleApiError } from "../../../api/utils"


export async function loginUser(formData: FormData) {
  try {
    const response = await apiLogin.post("api/user/signin", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data
  } catch (err) {
    return handleApiError(err)
  }
}

export async function registerUser(formData: FormData) {
  try {
    const response = await apiLogin.post("/api/user/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data
  } catch (err) {
    return handleApiError(err)
  }
}

export async function getInforUser() {
  try {
    const response = await api.get("/api/user/getInfoUser")
    return { error: null, data: response.data }
  } catch (error) {
    console.log(error)
  }
}

export async function logout() {
  try {
    await api.get("/api/user/logout")
  } catch (error) {
    return handleApiError(error)
  }
}

export async function changePassWord(formData: FormData) {
  try {
    const response = await api.put("/api/user/changePassword", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data
  } catch (error) {
    return handleApiError(error)
  }
}

export async function changeInfo(formData: FormData) {
  try {
    const response = await api.put("api/user/changeInfo", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    return { error: null, data: response.data.user }
  } catch (err) {
    handleApiError(err)
  }
}

export async function deleteUser() {
  try {
    const response = await api.delete(`api/user/deleteUser`)
  } catch (err) {
    handleApiError(err)
  }
}

