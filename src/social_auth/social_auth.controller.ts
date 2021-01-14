import { ApiTags } from '@nestjs/swagger'
import { Controller, Get, Query, UseGuards, ValidationPipe } from '@nestjs/common'
import { SocialAuthService } from './social_auth.service'
import { AuthGuard } from '@nestjs/passport'
import { CreateSocialAuthDto } from './dto/create-social-auth.dto'

@ApiTags('social')
@Controller('')
export class SocialAuthController {
  constructor(
    private  socialAuthService: SocialAuthService,
  ) {
  }
  @UseGuards(AuthGuard('google'))
  @Get('/auth/google')
  async googleAuth(@Query(new ValidationPipe()) req: CreateSocialAuthDto) {
    return req
  }

  @UseGuards(AuthGuard('google'))
  @Get('/auth/google/callback')
  async getTokenAfterGoogleSignIn(@Query(new ValidationPipe()) req: CreateSocialAuthDto) {
    console.log(req.uId)
    return req.uId
  }
}