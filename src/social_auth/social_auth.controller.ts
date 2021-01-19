import { ApiTags } from '@nestjs/swagger'
import { BadRequestException, Controller, Get, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { CreateSocialAuthDto } from './dto/create-social-auth.dto'

@ApiTags('social')
@Controller('aut')
export class SocialAuthController {
  constructor(
    // private  socialAuthService: SocialAuthService,
  ) {
  }

  @UseGuards(AuthGuard('google'))
  @Post('/google')
  // @Get('/auth/google')
  async googleAuth(@Query(new ValidationPipe()) createSocialAuthDto: CreateSocialAuthDto) {
    console.log('!!!googleAuth', createSocialAuthDto)
    throw new BadRequestException('googleAuth')
    // return await createSocialAuthDto
  }

  // @UseGuards(AuthGuard('google'))
  // @Get('/auth/google/callback')
  // async getTokenAfterGoogleSignIn(@Query(new ValidationPipe()) req: CreateSocialAuthDto) {
  //   console.log('!!!getTokenAfterGoogleSignIn', req.uId)
  //   return req.uId
  // }

  @UseGuards(AuthGuard('google'))
  @Post('/google/callback')
  // @Get('/auth/google/callback')
  async getTokenAfterGoogleSignIn(@Query(new ValidationPipe()) createSocialAuthDto: CreateSocialAuthDto) {
    console.log('!!!getTokenAfterGoogleSignIn', createSocialAuthDto)
    throw new BadRequestException('getTokenAfterGoogleSignIn')
    // return await createSocialAuthDto
  }
}