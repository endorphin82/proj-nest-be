import { PassportStrategy } from '@nestjs/passport'
import { Strategy, VerifyCallback } from 'passport-google-oauth20'
import { Injectable } from '@nestjs/common'
import { AuthService } from './auth.service'
import { ConfigService } from '@nestjs/config'
import { SocialAuthService } from '../social_auth/social_auth.service'


@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

  constructor(
    private socialAuthService: SocialAuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_SECRET'),
      callbackURL: `${configService.get<string>('SERVER_URL')}/auth/google/callback`,
      scope: ['email', 'profile'],
      session: false,
    })
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    console.log(accessToken, refreshToken, profile)
    const result = await this.socialAuthService.googleValidate(profile)

    try {
      done(null, result)

    } catch (err) {
      done(err, null)
    }
  }
}