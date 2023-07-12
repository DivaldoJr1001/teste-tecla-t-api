import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TopTenList, TopTenListDocument } from './top-ten-list.schema';

@Injectable()
export class TopTenListService {
  constructor(
    @InjectModel(TopTenList.name) private topTenListModel: Model<TopTenListDocument>,
  ) { }

  async get() {
    return await this.topTenListModel.findById('0').exec();
  }

  async create(topTenList: TopTenList) {
    topTenList._id = '0';
    const newTopTenList = new this.topTenListModel(topTenList);
    return await newTopTenList.save();
  }

  async update(topTenList: TopTenList) {
    return await this.topTenListModel.findByIdAndUpdate('0', topTenList, {
      new: true,
    });
  }
}
