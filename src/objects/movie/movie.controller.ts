import { Controller, Get, Param, Put, Query, UseGuards } from '@nestjs/common';
import { MovieService } from './movie.service';
import { AuthGuard } from './../../auth/auth.guard';
import { UserService } from '../user/user.service';
import { User } from '../user/user.schema';

@Controller('movies')
export class MovieController {

  constructor(
    private movieService: MovieService,
    private userService: UserService
  ) { }

  @Get()
  async getAll() {
    return await this.movieService.getAll();
  }

  @Get("/id/:id")
  async getById(@Param('id') id: string) {
    return await this.movieService.getById(id);
  }

  @UseGuards(AuthGuard)
  @Put('/like/:id/:username')
  async likeMovie(
    @Param('id') id: string,
    @Param('username') username?: string
  ) {
    const movie = await this.movieService.getById(id);
    movie.likes_count = movie.likes_count + 1;

    if (username) {
      const user: User = await this.userService.getByUsername(username);
      user.liked_movies.push(id);
      user.liked_movies = [... new Set(user.liked_movies.sort())];
      await this.userService.update(username, user);
    }

    return await this.movieService.update(id, movie);
  }

  @UseGuards(AuthGuard)
  @Put('/removeLike/:id/:username')
  async removeLikeMovie(
    @Param('id') id: string,
    @Param('username') username?: string
  ) {
    const movie = await this.movieService.getById(id);
    movie.likes_count = movie.likes_count == 0 ? movie.likes_count : movie.likes_count - 1;

    if (username) {
      const user: User = await this.userService.getByUsername(username);
      user.liked_movies = user.liked_movies.filter(m => m !== id);
      await this.userService.update(username, user);
    }

    return await this.movieService.update(id, movie);
  }
}
