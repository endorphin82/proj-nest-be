import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { IUser } from './interfaces/user.interface'
import { CreateUserDto } from './dto/create-user.dto'
import * as bcrypt from 'bcrypt'
import * as _ from 'lodash'

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {
  }

  async create(createUserDto: CreateUserDto, roles: Array<string>): Promise<IUser> {
    const saltRounds = 10
    const salt = await bcrypt.genSalt(saltRounds)
    const hash = await bcrypt.hash(createUserDto.password, salt)

    const createUser = new this.userModel(_.assignIn(createUserDto, { password: hash, roles }))
    return await createUser.save()
  }

  async find(id: string): Promise<IUser> {
    return await this.userModel.findById(id).exec()
  }
}
