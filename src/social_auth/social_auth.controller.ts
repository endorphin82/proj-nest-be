import { ApiTags } from '@nestjs/swagger'
import { Controller, Get, UseGuards } from '@nestjs/common'
import { SocialAuthService } from './social_auth.service'
import { AuthGuard } from '@nestjs/passport'

@ApiTags('social')
@Controller('')
export class SocialAuthController {
  constructor(
    private  socialAuthService: SocialAuthService,
  ) {
  }
  @UseGuards(AuthGuard('google'))
  @Get('/auth/google')
  async googleAuth(req) {
    return req
  }

  @UseGuards(AuthGuard('google'))
  @Get('/auth/google/callback')
  async getTokenAfterGoogleSignIn(req) {
    console.log(req.user)
    return req.user
  }
}