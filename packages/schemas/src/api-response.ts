export type ApiSuccessResponse<T> = {
  success: true
  message: string
  timestamp: string
  data: T
}

export type ApiErrorResponse = {
  success: false
  message: string
  timestamp: string
  error: string
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse
