export interface ChatMessage {
  _id: string
  message: string
  senderId: string | { _id: string }
  createdAt: string
  channelName?: string
}

export interface ChatChannel {
  _id: string
  channelName: string
  partnerId: string
  partnerName: string
  partnerAvatar?: string
  plateReg?: string
  registrationId?: string
  plateNumber?: string
  plate?: { registrationId: string }
  plateId?: { registrationId: string }
}
