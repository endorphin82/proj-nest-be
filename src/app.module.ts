import { MiddlewareConsumer, Module } from '@nestjs/common'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { MongooseModule } from '@nestjs/mongoose'
import { configModule } from './configure.root'
import { TokenModule } from './token/token.module'
import { MailModule } from './mail/mail.module'
import { SocialAuthModule } from './social_auth/social_auth.module'
import { LoggerMiddleware } from './common/logger.middleware'

@Module({
  imports: [
    UserModule,
    AuthModule,
    SocialAuthModule,
    configModule,
    MongooseModule.forRoot(process.env.MONGODB_WRITE_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    TokenModule,
    MailModule,
  ],
})

export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*')
  }
}
