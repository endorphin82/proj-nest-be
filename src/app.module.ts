import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'

const environment = process.env.NODE_ENV || 'development'

@Module({
  imports: [
    UserModule,
    AuthModule,

    ConfigModule.forRoot({
      envFilePath: `.env.${environment}`,
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      process.env.MONGODB_WRITE_CONNECTION_STRING,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    ),
  ],
})
export class AppModule {
}
