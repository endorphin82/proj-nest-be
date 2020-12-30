import { Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { CreateUserDto } from '../user/dto/create-user.dto'
import { roleEnum } from '../user/enums/role.enum'
import { TokenService } from '../token/token.service'

@Injectable()
export class AuthGoogleService {

  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {

  }

  async signGoogle(createUserDto: CreateUserDto): Promise<boolean> {

    const user = await this.userService.create(createUserDto, [roleEnum.user])
    return true
  }
}