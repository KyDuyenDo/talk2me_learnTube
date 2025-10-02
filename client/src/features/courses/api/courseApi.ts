import { api } from "../../../api/utils";
import type { Category, Course } from "../types";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const API_BASE_URL = "http://127.0.0.1:5000/api/generate";

interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const courseApi = {
  getCourses: async (
    params?: {
      page?: number;
      limit?: number;
      categoryId?: string;
      search?: string;
      sortBy?: "createdAt" | "title" | "progress";
      sortOrder?: "asc" | "desc";
    }
  ): Promise<PaginatedResponse<any>> => {
    try {
      const searchParams = new URLSearchParams()
      if (params?.page) searchParams.append("page", params.page.toString())
      if (params?.limit) searchParams.append("limit", params.limit.toString())
      if (params?.categoryId) searchParams.append("categoryId", params.categoryId)
      if (params?.search) searchParams.append("search", params.search)
      if (params?.sortBy) searchParams.append("sortBy", params.sortBy)
      if (params?.sortOrder) searchParams.append("sortOrder", params.sortOrder)

      const response = await api.get(`/api/course` /* + '?' + searchParams.toString() */);

      if (!response || !response.data) {
        throw new Error("Empty response from server");
      }

      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  getCourse: async (courseId: string): Promise<Course> => {
    const response = await api.get<ApiResponse<Course>>(`/api/courses/${courseId}`);
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error || "Failed to fetch course");
    }
    return response.data.data;
  },

  createCourse: async (courseData: {
    youtubeUrl: string;
    categoryId: string;
  }) => {
    const formData = new FormData();
    for (const key in courseData) {
      formData.append(key, (courseData as any)[key]);
    }

    const response = await api.post<ApiResponse<Course>>("/api/course", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (!response.data) {
      throw new Error("Failed to create course");
    }
    return response.data;
  },

  deleteCourse: async (courseId: string): Promise<void> => {
    const response = await api.delete<ApiResponse<null>>(`/api/courses/${courseId}`);
    if (!response.data.success) {
      throw new Error(response.data.error || "Failed to delete course");
    }
  },

  updateProgress: async (courseId: string, progress: number): Promise<Course> => {
    const response = await api.patch<ApiResponse<Course>>(`/api/courses/${courseId}`, { progress });
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error || "Failed to update progress");
    }
    return response.data.data;
  },
};


export const categoryApi = {
  getCategories: async (): Promise<Category[]> => {
    const response = await api.get<ApiResponse<Category[]>>(`/api/categories`);
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error || "Failed to fetch categories");
    }
    return response.data.data;
  },

  createCategory: async (categoryData: { name: string; }): Promise<Category> => {
    const response = await api.post<ApiResponse<Category>>("/api/categories", categoryData, {
      headers: { "Content-Type": "application/json" },
    });
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error || "Failed to create category");
    }
    return response.data.data;
  },

  deleteCategory: async (categoryId: string): Promise<void> => {
    const response = await api.delete<ApiResponse<null>>(`/api/categories/${categoryId}`);
    if (!response.data.success) {
      throw new Error(response.data.error || "Failed to delete category");
    }
  },
};

export const youtubeApi = {
  getVideoInfo: async (youtubeUrl: string) => {
    const response = await api.post(
      `${API_BASE_URL}/youtube-info`,
      { youtubeUrl: youtubeUrl },
      {
        headers: {
          "X-API-KEY": "12345",
        },
        withCredentials: true,
      }
    );

    if (!response.data) {
      throw new Error("Failed to fetch video information");
    }

    return response.data;
  },

  validateUrl: async (youtubeUrl: string): Promise<boolean> => {
    try {
      await youtubeApi.getVideoInfo(youtubeUrl);
      return true;
    } catch {
      return false;
    }
  },
};
