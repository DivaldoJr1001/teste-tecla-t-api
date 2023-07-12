import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { TopTenListService } from './top-ten-list.service';
import { TopTenList } from './top-ten-list.schema';
import { AuthGuard } from './../../auth/auth.guard';

@Controller('toptenlist')
export class TopTenListController {

  constructor(private topTenListService: TopTenListService) { }

  @Get()
  async get() {
    return await this.topTenListService.get();
  }
}
