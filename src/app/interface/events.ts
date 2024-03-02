import {EventType} from "../enum/EventType";

export interface Events {
  id: number
  eventType: EventType
  description: string
  device: string
  ipAddress: string
  createdAt: Date
}
