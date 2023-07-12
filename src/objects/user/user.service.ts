import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) { }

  async getAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async getByUsername(username: string) {
    return await this.userModel.findOne({ username })
  }

  async create(user: User) {
    const newUser = new this.userModel(user);
    return await newUser.save();
  }

  async update(username: string, user: User) {
    return await this.userModel.findOneAndUpdate({ username }, user, {
      new: true,
    });
  }

  async delete(username: string) {
    await this.userModel.findOneAndRemove({ username });
  }
}
