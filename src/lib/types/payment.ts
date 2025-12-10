export interface PaymentResponse {
  data?: {
    onboardingUrl?: {
      onboardingUrl?: string
    }
  }
  url?: string
}

export interface PaymentError {
  message?: string
  status?: number
}
