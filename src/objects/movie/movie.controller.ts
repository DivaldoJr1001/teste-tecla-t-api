import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { MovieService } from './movie.service';
import { Movie } from './movie.schema';
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

  // @UseGuards(AuthGuard)
  // @Post('/create')
  // async createMovie(@Body() movie: Movie) {
  //   const newMovie = await this.movieService.create(movie);
  //   return newMovie;
  // }

  @UseGuards(AuthGuard)
  @Put('/update/:id')
  async updateMovie(
    @Param('id') id: string,
    @Body() movie: Movie,
  ) {
    return await this.movieService.update(id, movie);
  }

  // @UseGuards(AuthGuard)
  // @Delete('/delete/:id')
  // async deleteMovie(@Param('id') id: string) {
  //   await this.movieService.delete(id);
  // }
}
