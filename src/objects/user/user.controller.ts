import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';
import * as bcrypt from 'bcrypt';
// import { AuthGuard } from './../../auth/auth.guard';

@Controller('users')
export class UserController {

  constructor(private userService: UserService) { }

  @Post('/create')
  async createUser(@Body() user: User) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = await this.userService.create({
      username: user.username,
      password: hashedPassword
    });
    return newUser;
  }

  @Get('/:username')
  async getUser(
    @Param('username') username: string
  ) {
    console.log(username);
    return await this.userService.getByUsernameWithoutPass(username);
  }
}
