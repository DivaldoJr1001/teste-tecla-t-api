import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { TopTenListService } from './top-ten-list.service';
import { TopTenList } from './top-ten-list.schema';
import { AuthGuard } from './../../auth/auth.guard';

@Controller('top-ten-list')
export class TopTenListController {

  constructor(private topTenListService: TopTenListService) { }

  @Get()
  async get() {
    return await this.topTenListService.get();
  }

  @UseGuards(AuthGuard)
  @Post('/create')
  async createTopTenList(@Body() topTenList: TopTenList) {
    topTenList._id = '0';
    const newTopTenList = await this.topTenListService.create(topTenList);
    return newTopTenList;
  }

  @UseGuards(AuthGuard)
  @Put('/update/:id')
  async updateTopTenList(
    @Body() topTenList: TopTenList,
  ) {
    return await this.topTenListService.update(topTenList);
  }
}
