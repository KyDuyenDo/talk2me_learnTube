import { api } from "../../../api/utils"

export async function loginUser(formData: FormData) {
  try {
    const response = await api.post("api/user/signin", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return { error: null, data: response.data }
  } catch (error) {
    console.log(error)
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
    console.log(error)
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
    console.log(error)
  }
}
