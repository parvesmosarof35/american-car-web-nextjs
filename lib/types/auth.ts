export interface UserVerificationResponse {
  success: boolean
  message: string
}

export interface UserVerificationError {
  data?: {
    message: string
  }
}
