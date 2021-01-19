import {
  BadRequestException,
  Body,
  Controller,
  Get, Patch,
  Post,
  Query, Req, UseGuards,
  ValidationPipe,
} from '@nestjs/common'
import { CreateUserDto } from '../user/dto/create-user.dto'
import { AuthService } from './auth.service'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { ConfirmAccountDto } from './dto/confirm-account.dto'
import { SignInDto } from './dto/signin.dto'
import { IReadableUser } from '../user/interfaces/readable-user.interface'
import { ChangePasswordDto } from './dto/change-password.dto'
import { ForgotPasswordDto } from './dto/forgot-password.dto'
import { AuthGuard } from '@nestjs/passport'
import { IUser } from '../user/interfaces/user.interface'
import { GetUser } from '../components/decorators/get-user.decorator'
import { ChangeMyPasswordDto } from './dto/change-my-password.dto'
import { SocialAuthService } from '../social_auth/social_auth.service'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {
  }

  @Post('/signUp')
  async signUp(@Body(new ValidationPipe()) createUserDto: CreateUserDto): Promise<boolean> {
    // throw new BadRequestException('signUp')
    console.log('signUp')
    // return this.authService.signUp(createUserDto)
  }

  @Get('/confirm')
  async confirm(@Query(new ValidationPipe()) query: ConfirmAccountDto): Promise<boolean> {
    await this.authService.confirm(query.token)
    return true
  }

  @Post('/signIn')
  async signIn(@Body(new ValidationPipe()) signInDto: SignInDto): Promise<IReadableUser> {
    // throw new BadRequestException('signIn')
    console.log('signIn')
    // return await this.authService.signIn(signInDto)
  }

  @Post('/forgotPassword')
  async forgotPassword(@Body(new ValidationPipe()) forgotPasswordDto: ForgotPasswordDto): Promise<void> {
    return this.authService.forgotPassword(forgotPasswordDto)
  }

  @Post('/changemypass')
  async changeMyPass(@Body(new ValidationPipe()) changeMyPasswordDto: ChangeMyPasswordDto): Promise<boolean> {
    return this.authService.changeMyPass(changeMyPasswordDto)
  }

  @Patch('/changePassword')
  @UseGuards(AuthGuard())
  async changePassword(
    @GetUser() user: IUser,
    @Body(new ValidationPipe()) changePasswordDto: ChangePasswordDto,
  ): Promise<boolean> {
    return this.authService.changePassword(user._id, changePasswordDto)
  }
}
