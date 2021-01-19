import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { ISocialAuth } from './interfaces/social-auth.interface'
import { CreateSocialAuthDto } from './dto/create-social-auth.dto'
import { JwtService } from '@nestjs/jwt'
import { IUser } from '../user/interfaces/user.interface'

@Injectable()
export class SocialAuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel('SocialAuth') private readonly socialAuthModel: Model<ISocialAuth>) {
  }

  async googleValidate(profile: any) {
    const service = 'google'
    const serviceId = profile.id
    const email = profile.emails[0].value
    return await this.socialValidate(service, serviceId, email)
  }

  async create(createSocialAuthDto: CreateSocialAuthDto): Promise<ISocialAuth> {
    const socialAuth = new this.socialAuthModel(createSocialAuthDto)
    return await socialAuth.save()
  }

  private async socialValidate(service, serviceId, email) {
    const socialAuth = await this.socialAuthModel.findOne({ where: { serviceId } })
    console.log(socialAuth)
    const result = {
      type: 'signIn',
      email,
      service,
    }

    let user
    if (socialAuth) { // Sign In

      console.log('sign_in')
      // user = await this.userService.find(socialAuth.uId)
    } else { // Sign On
      console.log('sign_on')
      // user = await this.userService.findByEmail(email)
      // if (!user) {
      //   await this.userService.create({ email })
      // }
      // await this.create({ uId: user.id, service, serviceId })
      await this.create({ service, serviceId })
      // const newSocialAuth = new SocialAuth(user.id, service, serviceId)

      result.type = 'signOn'
    }
    result['token'] = this.getToken(user)
    return result
  }

  getToken(user: IUser): string {
    const payload = {
      email: user.email,
      uId: user.id,
    }
    const token = this.jwtService.sign(payload)
    return token
  }

}
