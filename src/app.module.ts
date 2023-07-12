import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { FetchMoviesService } from './global-services/fetch-movies.service';
import { HttpModule } from '@nestjs/axios';
import { MovieModule } from './objects/movie/movie.module';
import { UserModule } from './objects/user/user.module';
import { AuthModule } from './auth/auth.module';
import { TopTenListModule } from './objects/top-ten-list/top-ten-list.module';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://localhost/testeTeclaT`),
    ScheduleModule.forRoot(),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    AuthModule,
    MovieModule,
    UserModule,
    TopTenListModule
  ],
  controllers: [AppController],
  providers: [
    FetchMoviesService],
})
export class AppModule {}
