import { HttpService } from '@nestjs/axios';
import { combineLatest } from 'rxjs';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { env } from 'src/environment/env';
import { Movie } from 'src/objects/movie/movie.schema';
import { MovieService } from 'src/objects/movie/movie.service';
import { TopTenListService } from 'src/objects/top-ten-list/top-ten-list.service';
import { TopTenList } from 'src/objects/top-ten-list/top-ten-list.schema';

@Injectable()
export class FetchMoviesService {
  constructor(
    private readonly httpService: HttpService,
    private movieService: MovieService,
    private topTenListService: TopTenListService
  ) { }

  private readonly logger = new Logger(FetchMoviesService.name);

  @Cron(CronExpression.EVERY_HOUR)
  fetchMovies() {
    combineLatest([
      this.httpService.get(`${env.tmdbAPI.address}/movie/popular?api_key=${env.tmdbAPI.key}&region=BR`),
      this.httpService.get(`${env.tmdbAPI.address}/genre/movie/list?api_key=${env.tmdbAPI.key}&region=BR`),
      this.httpService.get(`http://localhost:${env.port}/movies`)
    ]).subscribe(async res => {
      const genres: Genre[] = res[1].data.genres;

      const savedMovies: { [key: number]: Movie } = {};

      for (const movie of res[2].data as Movie[]) {
        savedMovies[movie._id] = movie;
      }

      const movies: Movie[] = (res[0].data.results as any[]).map((m) => {
        return {
          _id: m.id,
          adult: m.adult,
          backdrop_path: m.backdrop_path,
          genres: (m.genre_ids as number[]).map(gid => genres.find(g => g.id === gid).name),
          original_language: m.original_language,
          original_title: m.original_title,
          overview: m.overview,
          popularity: m.popularity,
          poster_path: m.poster_path,
          release_date: m.release_date,
          title: m.title,
          video: m.video,
          likes_count: savedMovies[m.id] ? savedMovies[m.id].likes_count : 0
        }
      });

      for (const movie of movies.slice(0, 10)) {
        if (savedMovies[movie._id]) {
          await this.movieService.update(movie._id, movie);
        } else {
          await this.movieService.create(movie);
        }
      }
      this.logger.debug('Movies fetched');

      const topTenList: TopTenList = {
        topTenMovies: movies.slice(0, 10).map(m => m._id)
      };
      const oldTopTenList = await this.topTenListService.get();

      if (oldTopTenList == null) {
        this.topTenListService.create(topTenList);
      } else if (JSON.stringify([... oldTopTenList.topTenMovies].sort()) !== JSON.stringify(([... topTenList.topTenMovies].sort()))) {
        this.topTenListService.update(topTenList);
      }
      this.logger.debug('Top ten updated');

    });
  }
}

interface Genre {
  id: number,
  name: string
}
