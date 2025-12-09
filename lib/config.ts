export const API_CONFIG = {
  imageUrl: process.env.NEXT_PUBLIC_IMAGE_URL || "https://efforts-minnesota-relates-denied.trycloudflare.com/",
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "https://efforts-minnesota-relates-denied.trycloudflare.com/api/v1/",
}

export const getImageUrl = (imagePath: string): string => {
  if (!imagePath) return ""

  // If it's already a full URL, return as-is
  if (imagePath.startsWith("http")) {
    return imagePath
  }

  // Remove trailing slash from base and leading slash from path
  const base = API_CONFIG.imageUrl.replace(/\/+$/, "")
  const path = imagePath.replace(/^\/+/, "")

  return `${base}/${path}`
}

export const getWsUrl = (): string => {
  // Browser-side function only
  if (typeof window === "undefined") return ""

  const wsProtocol = window.location.protocol === "https:" ? "wss" : "ws"
  const host = new URL(API_CONFIG.imageUrl).host
  return `${wsProtocol}://${host}`
}
