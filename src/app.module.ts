import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { FetchMoviesService } from './global_services/fetch-movies.service';
import { HttpModule } from '@nestjs/axios';
import { MovieModule } from './objects/movie/movie.module';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://localhost/testeTeclaT`),
    ScheduleModule.forRoot(),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    MovieModule
  ],
  controllers: [AppController],
  providers: [
    FetchMoviesService],
})
export class AppModule {}
