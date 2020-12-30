import { Module } from '@nestjs/common'
import { UserModule } from '../user/user.module'
import { configModule } from '../configure.root'
import { JwtModule } from '@nestjs/jwt'
import { AuthGoogleService } from './auth_google.service'
import { GoogleStrategy } from './google.strategy'
import { AuthGoogleController } from './auth_google.controller'
import { UserService } from '../user/user.service'


@Module({
  imports: [
    UserModule,

    configModule,

    JwtModule.register({
      secret: process.env.GOOGLE_SECRET,
    }),
  ],
  providers: [AuthGoogleService, GoogleStrategy],
  controllers: [AuthGoogleController],
  exports: [AuthGoogleService]
})
export class AuthGoogleModule {
}