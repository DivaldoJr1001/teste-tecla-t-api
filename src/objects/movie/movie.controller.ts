import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MovieService } from './movie.service';
import { Movie } from './movie.schema';

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

  @Post('/create')
  async createMovie(@Body() movie: Movie) {
    const newMovie = await this.movieService.create(movie);
    return newMovie;
  }

  @Put('/update/:id')
  async updateMovie(
    @Param('id') id: string,
    @Body() movie: Movie,
  ) {
    return await this.movieService.update(id, movie);
  }


  @Delete('/delete/:id')
  async deleteMovie(@Param('id') id: string) {
    await this.movieService.delete(id);
  }
}
