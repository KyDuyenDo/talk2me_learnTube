import { data } from "react-router-dom"
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

export async function changePassWord(formData: FormData) {
  try {
    const response = await api.post("/api/user/changePassword", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return { error: null, data: response.data }
  } catch (error) {
    console.log(error)
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
    console.log(err)
  }
}

export async function deleteUser() {
  try {
    const response = await api.post(`api/user/deleteUser`)
    return {
      error: null,
      data: response.data
    }
  }catch(err){
    handleApiError(err)
  }
}

