import * as mongoose from 'mongoose'

export const SocialAuthSchema = new mongoose.Schema({
  serviceId: { type: String, required: true },
  service: { type: String, required: false },
  uId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  expireAt: { type: Date, required: true },
})

SocialAuthSchema.index({ token: 1, uId: 1 }, { unique: true })
