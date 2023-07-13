import { Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { MovieService } from './movie.service';
import { AuthGuard } from './../../auth/auth.guard';

@Controller('movies')
export class MovieController {

  constructor(private movieService: MovieService) { }

  @Get()
  async getAll() {
    return await this.movieService.getAll();
  }

  @Get("/id/:id")
  async getById(@Param('id') id: string) {
    return await this.movieService.getById(id);
  }

  @UseGuards(AuthGuard)
  @Put('/like/:id')
  async likeMovie(
    @Param('id') id: string
  ) {
    const movie = await this.movieService.getById(id);
    movie.likes_count = movie.likes_count + 1;
    return await this.movieService.update(id, movie);
  }

  @UseGuards(AuthGuard)
  @Put('/removeLike/:id')
  async removeLikeMovie(
    @Param('id') id: string
  ) {
    const movie = await this.movieService.getById(id);
    movie.likes_count = movie.likes_count == 0 ? movie.likes_count : movie.likes_count - 1;
    return await this.movieService.update(id, movie);
  }
}
