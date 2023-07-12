import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TopTenListSchema } from './top-ten-list.schema';
import { TopTenListService } from './top-ten-list.service';
import { TopTenListController } from './top-ten-list.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'TopTenList',
        schema: TopTenListSchema,
        collection: 'TopTenLists',
      },
    ]),
  ],
  providers: [TopTenListService],
  exports: [TopTenListService],
  controllers: [TopTenListController],
})
export class TopTenListModule { }
