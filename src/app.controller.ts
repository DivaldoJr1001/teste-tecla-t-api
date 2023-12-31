import { Controller, Get } from '@nestjs/common';
import { FetchMoviesService } from './global-services/fetch-movies.service';

@Controller()
export class AppController {
  constructor(
    private readonly fetchMoviesService: FetchMoviesService
  ) {
    setTimeout( () => { fetchMoviesService.fetchMovies(); }, 500 );
  }
}
