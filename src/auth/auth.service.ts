import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from '../user/user.service'
import { TokenService } from '../token/token.service'
import { SignOptions } from 'jsonwebtoken'
import { CreateUserDto } from '../user/dto/create-user.dto'
import { CreateUserTokenDto } from '../token/dto/create-user-token.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {
  }

  signUp(createUserDto: CreateUserDto) {

  }

  signIn(email, password) {

  }

  private async generateToken(data, options?: SignOptions): Promise<string> {
    return this.jwtService.sign(data, options)
  }

  private async verifyToken(token): Promise<any> {
    try {
      const data = this.jwtService.verify(token)
      const tokenExists = await this.tokenService.exists(data._id, token)

      if (tokenExists) {
        return data
      }
      throw new UnauthorizedException()
    } catch (error) {
      throw new UnauthorizedException()
    }
  }

  private async saveToken(createUserTokenDto: CreateUserTokenDto) {
    const userToken = await this.tokenService.create(createUserTokenDto)

    return userToken
  }
}