export interface FormData {
  title: string
  description: string
  youtubeUrl: string
  categoryId: string
  newCategoryName: string
}

export interface VideoInfo {
  title: string
  channel: string
  thumbnail: string
}

export interface Course {
  id: string
  title: string
  description?: string
  youtubeUrl: string
  thumbnail: string
  channel: string
  categoryId: string
  userId?: string
  createdAt?: string
  updatedAt?: string
  isCompleted?: boolean
  progress?: number
}

export interface Category {
  id: string
  name: string
  userId: string
  createdAt: string
  courseCount?: number
}