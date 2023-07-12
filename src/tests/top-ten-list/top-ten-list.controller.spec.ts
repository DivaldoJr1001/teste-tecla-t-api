import { Test, TestingModule } from "@nestjs/testing";
import { MongoMemoryServer } from "mongodb-memory-server";
import { Connection, connect, Model } from "mongoose";
import { getModelToken } from "@nestjs/mongoose";
import { TopTenListController } from "../../objects/top-ten-list/top-ten-list.controller";
import { TopTenListService } from "../../objects/top-ten-list/top-ten-list.service";
import { TopTenList, TopTenListSchema } from "../../objects/top-ten-list/top-ten-list.schema";
import { TopTenListStub } from "./top-ten-list.stub";
import { JwtService } from "@nestjs/jwt";


describe("TopTenListController", () => {
  let topTenListController: TopTenListController;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let topTenListModel: Model<TopTenList>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    topTenListModel = mongoConnection.model(TopTenList.name, TopTenListSchema);
    const topTenList: TestingModule = await Test.createTestingModule({
      controllers: [TopTenListController],
      providers: [
        TopTenListService,
        JwtService,
        {provide: getModelToken(TopTenList.name), useValue: topTenListModel},
      ],
    }).compile();
    topTenListController = topTenList.get<TopTenListController>(TopTenListController);
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  afterEach(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  describe("[GET]", () => {
    it("(get) Busca a lista de IDs dos 10 filmes mais populares", async () => {
      await (new topTenListModel(TopTenListStub()).save());
      const topTenList = await topTenListController.get();
      expect(topTenList.topTenMovies).toEqual(TopTenListStub().topTenMovies);
    });
    it("(get) Busca a lista de IDs dos 10 filmes mais popula e não a encontra", async () => {
      const topTenLists = await topTenListController.get();
      expect(topTenLists).toBeNull();
    });
  });
});
