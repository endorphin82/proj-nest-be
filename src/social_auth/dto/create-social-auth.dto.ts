import { IsString, IsDateString } from 'class-validator'
import * as mongoose from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

export class CreateSocialAuthDto {
  @ApiProperty()
  @IsString()
  serviceId: string

  @ApiProperty()
  @IsString()
  service: string
  //
  // @ApiProperty()
  // @IsString()
  // uId: mongoose.Types.ObjectId

  // @ApiProperty()
  // @IsDateString()
  // expireAt?: string
}
