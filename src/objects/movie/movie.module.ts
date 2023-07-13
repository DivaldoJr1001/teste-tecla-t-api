import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieSchema } from './movie.schema';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Movie',
        schema: MovieSchema,
        collection: 'Movies',
      },
    ]),
    UserModule,
  ],
  providers: [MovieService],
  exports: [MovieService],
  controllers: [MovieController],
})
export class MovieModule { }
