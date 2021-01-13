import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { SocialAuthSchema } from './schemas/social-auth.schema'
import { SocialAuthService } from './social_auth.service'


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'SocialAuth', schema: SocialAuthSchema }]),
  ],
  providers: [SocialAuthService],
  exports: [SocialAuthService],
})
export class SocialAuthModule {
}
