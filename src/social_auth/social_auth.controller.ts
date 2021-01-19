import { ApiTags } from '@nestjs/swagger'
import { Controller, Get, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common'
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
  @Post('/auth/google')
  // @Get('/auth/google')
  async googleAuth(@Query(new ValidationPipe()) req: CreateSocialAuthDto) {
    console.log('!!!googleAuth', req)
    return req
  }

  // @UseGuards(AuthGuard('google'))
  // @Get('/auth/google/callback')
  // async getTokenAfterGoogleSignIn(@Query(new ValidationPipe()) req: CreateSocialAuthDto) {
  //   console.log('!!!getTokenAfterGoogleSignIn', req.uId)
  //   return req.uId
  // }

  @UseGuards(AuthGuard('google'))
  @Post('/auth/google/callback')
  // @Get('/auth/google/callback')
  async getTokenAfterGoogleSignIn(@Query(new ValidationPipe()) req: CreateSocialAuthDto) {
    console.log('!!!getTokenAfterGoogleSignIn', req.uId)
    return req.uId
  }
}