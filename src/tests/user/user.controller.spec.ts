import { Test, TestingModule } from "@nestjs/testing";
import { MongoMemoryServer } from "mongodb-memory-server";
import { Connection, connect, Model } from "mongoose";
import { getModelToken } from "@nestjs/mongoose";
import { UserController } from "../../objects/user/user.controller";
import { UserService } from "../../objects/user/user.service";
import { User, UserSchema } from "../../objects/user/user.schema";
import { UserStub } from "./user.stub";


describe("UserController", () => {
  let userController: UserController;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let userModel: Model<User>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    userModel = mongoConnection.model(User.name, UserSchema);
    const user: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {provide: getModelToken(User.name), useValue: userModel},
      ],
    }).compile();
    userController = user.get<UserController>(UserController);
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
    it("(getUser) Busca um usuário por nome de usuário e o retorna sem a senha", async () => {
      await (new userModel(UserStub()).save());
      const user = await userController.getUser(UserStub().username);
      expect(user).toStrictEqual({
        username: UserStub().username,
        liked_movies: UserStub().liked_movies
      });
    });
  });

  describe("[POST]", () => {
    it("(createUser) Cria o objeto pela primeira vez", async () => {
      const createdUser = await userController.createUser(UserStub());
      expect(createdUser.username).toBe(UserStub().username);
    });
    it("(createUser) Tenta criar um objeto idêntico e retorna erro de objeto duplicado", async () => {
      await (new userModel(UserStub()).save());
      await expect(userController.createUser(UserStub()))
        .rejects
        .toThrow(Error)
    });
  });
});
