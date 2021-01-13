import { Document } from 'mongoose'

export interface ISocialAuth extends Document {
  readonly serviceId: string
  readonly service: string
  readonly uId: string
  readonly expireAt: string
}
