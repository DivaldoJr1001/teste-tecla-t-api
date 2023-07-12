import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from './../../auth/auth.guard';

@Controller('users')
export class UserController {

  constructor(private userService: UserService) { }

  // @UseGuards(AuthGuard)
  // @Get()
  // async getAll() {
  //   return await this.userService.getAll();
  // }

  // @UseGuards(AuthGuard)
  // @Get("/username/:username")
  // async getByUsername(@Param('username') username: string) {
  //   return await this.userService.getByUsername(username);
  // }

  @Post('/create')
  async createUser(@Body() user: User) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = await this.userService.create({
      username: user.username,
      password: hashedPassword
    });
    return newUser;
  }

  // @UseGuards(AuthGuard)
  // @Put('/update/:username')
  // async updateUser(
  //   @Param('username') username: string,
  //   @Body() user: User,
  // ) {
  //   return await this.userService.update(username, user);
  // }

  // @UseGuards(AuthGuard)
  // @Delete('/delete/:username')
  // async deleteUser(@Param('username') username: string) {
  //   await this.userService.delete(username);
  // }
}
