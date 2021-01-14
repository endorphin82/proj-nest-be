import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { SocialAuthSchema } from './schemas/social-auth.schema'
import { SocialAuthService } from './social_auth.service'
import { SocialAuthController } from './social_auth.controller'
import { UserModule } from '../user/user.module'
import { TokenModule } from '../token/token.module'
import { JwtModule } from '@nestjs/jwt'
import { GoogleStrategy } from '../auth/google.strategy'


@Module({
  imports: [
    UserModule,
    TokenModule,
    MongooseModule.forFeature([{ name: 'SocialAuth', schema: SocialAuthSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [SocialAuthService, GoogleStrategy],
  controllers: [SocialAuthController],
})
export class SocialAuthModule {
}
