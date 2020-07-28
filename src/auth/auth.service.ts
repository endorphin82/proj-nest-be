import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from '../user/user.service'
import { TokenService } from '../token/token.service'
import { SignOptions } from 'jsonwebtoken'
import { CreateUserDto } from '../user/dto/create-user.dto'
import { CreateUserTokenDto } from '../token/dto/create-user-token.dto'
import { ConfigService } from '@nestjs/config'
import { MailService } from '../mail/mail.service'
import { roleEnum } from '../user/enums/role.enum'
import { IUser } from '../user/interfaces/user.interface'
import moment from 'moment'
import { statusEnum } from '../user/enums/status.enum'

@Injectable()
export class AuthService {
  private readonly clientAppUrl: string

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
  ) {
    this.clientAppUrl = this.configService.get<string>('FE_APP_URL')
  }

  async signUp(createUserDto: CreateUserDto): Promise<boolean> {
    const user = await this.userService.create(createUserDto, [roleEnum.user])
    await this.sendConfirmation(user)
    return true
  }

  signIn(email, password) {}

  async confirm(token: string): Promise<IUser> {
    const data = await this.verifyToken(token)
    const user = await this.userService.find(data._id)

    await this.tokenService.delete(data._id, token)

    if (user && user.status === statusEnum.pending) {
      user.status = statusEnum.active
      return user.save()
    }
    throw new BadRequestException('Confirmation error')
  }

  async sendConfirmation(user: IUser) {
    const expiresIn = 60 * 60 * 24 // 24 hours
    const tokenPayload = {
      _id: user._id,
      status: user.status,
      roles: user.roles,
    }
    const expireAt = moment()
      .add(1, 'day')
      .toISOString()

    const token = await this.generateToken(tokenPayload, { expiresIn })
    const confirmLink = `${this.clientAppUrl}/auth/confirm?token=${token}`

    await this.saveToken({ token, uId: user._id, expireAt })
    await this.mailService.send({
      from: this.configService.get<string>('JS_CODE_MAIL'),
      to: user.email,
      subject: 'Verify User',
      text: `
                <h3>Hello ${user.firstName}!</h3>
                <p>Please use this <a href="${confirmLink}">link</a> to confirm your account.</p>
            `,
    })
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
