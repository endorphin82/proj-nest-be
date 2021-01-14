import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtStrategy } from './jwt.strategy'
import { configModule } from '../configure.root'
import { PassportModule } from '@nestjs/passport'
import { UserModule } from '../user/user.module'
import { TokenModule } from '../token/token.module'
import { MailModule } from '../mail/mail.module'
import { SocialAuthModule } from '../social_auth/social_auth.module'
import { GoogleStrategy } from './google.strategy'
import { SocialAuthService } from '../social_auth/social_auth.service'

@Module({
  imports: [
    UserModule,
    TokenModule,
    SocialAuthModule,
    configModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    MailModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})

export class AuthModule {}
