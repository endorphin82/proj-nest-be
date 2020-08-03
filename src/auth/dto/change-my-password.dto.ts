import { IsString, Matches, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class ChangeMyPasswordDto {
  @IsString()
  @IsNotEmpty()
  @Matches(
    /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/,
    { message: 'Weak password' },
  )
  @ApiProperty()
  readonly password: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly token: string
}
