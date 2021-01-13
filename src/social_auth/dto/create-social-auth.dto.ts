import { IsString, IsDateString } from 'class-validator'
import * as mongoose from 'mongoose'

export class CreateSocialAuthDto {
  @IsString()
  serviceId: string

  @IsString()
  service: string

  @IsString()
  uId: mongoose.Types.ObjectId

  @IsDateString()
  expireAt: string
}
