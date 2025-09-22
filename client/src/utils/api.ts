// API utility functions
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string,
  ) {
    super(message)
    this.name = "ApiError"
  }
}

export const handleApiError = (error: unknown): string => {
  if (error instanceof ApiError) {
    return error.message
  }

  if (error instanceof Error) {
    return error.message
  }

  return "An unexpected error occurred"
}

export const createApiUrl = (endpoint: string, params?: Record<string, string | number | boolean>): string => {
  const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:3001/api"
  const url = new URL(endpoint, baseUrl)

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value))
    })
  }

  return url.toString()
}

export const fetchWithTimeout = async (url: string, options: RequestInit = {}, timeout = 10000): Promise<Response> => {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    })

    clearTimeout(timeoutId)
    return response
  } catch (error) {
    clearTimeout(timeoutId)

    if (error instanceof Error && error.name === "AbortError") {
      throw new ApiError("Request timeout", 408, "TIMEOUT")
    }

    throw error
  }
}

// Local storage utilities for offline support
export const localStorageKeys = {
  courses: "courses_cache",
  categories: "categories_cache",
  lastSync: "last_sync_timestamp",
}

export const saveToLocalStorage = <T>(key: string, data: T): void => {\
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.warn('Failed to save to localStorage:', error)
  }
}

export const loadFromLocalStorage = <T>(key: string): T | null => {\
  try {\
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null
  } catch (error) {
    console.warn('Failed to load from localStorage:', error)\
    return null
  }
}

export const clearLocalStorage = (key: string): void => {\
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.warn('Failed to clear localStorage:', error)
  }\
}
