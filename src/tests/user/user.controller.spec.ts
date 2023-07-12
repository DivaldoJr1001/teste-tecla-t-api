import { Test, TestingModule } from "@nestjs/testing";
import { MongoMemoryServer } from "mongodb-memory-server";
import { Connection, connect, Model } from "mongoose";
import { getModelToken } from "@nestjs/mongoose";
import { UserController } from "../../objects/user/user.controller";
import { UserService } from "../../objects/user/user.service";
import { User, UserSchema } from "../../objects/user/user.schema";
import { UserStub } from "./user.stub";
import { JwtService } from "@nestjs/jwt";


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
        JwtService,
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

  // describe("[GET]", () => {
  //   it("Busca todos os objetos", async () => {
  //     await (new userModel(UserStub()).save());
  //     const users = await userController.getAll();
  //     expect(users.map(m => m.username)).toStrictEqual([UserStub().username]);
  //   });
  //   it("Busca um objeto por Username e o retorna", async () => {
  //     await (new userModel(UserStub()).save());
  //     const user = await userController.getByUsername(UserStub().username);
  //     expect(user.username).toBe(UserStub().username);
  //   });
  //   it("Busca um objeto por Username e não o encontra", async () => {
  //     const user = await userController.getByUsername(UserStub().username);
  //     expect(user).toBeNull();
  //   });
  // });

  describe("[POST]", () => {
    it("Cria o objeto pela primeira vez", async () => {
      const createdUser = await userController.createUser(UserStub());
      expect(createdUser.username).toBe(UserStub().username);
    });
    it("Tenta criar um objeto idêntico e retorna erro de objeto duplicado", async () => {
      await (new userModel(UserStub()).save());
      await expect(userController.createUser(UserStub()))
        .rejects
        .toThrow(Error)
    });
  });

  // describe("[PUT]", () => {
  //   it("Atualiza um objeto salvo pelo seu ID", async () => {
  //     await (new userModel(UserStub()).save());
  //     const updatedUserObject = {
  //       ...UserStub(),
  //       title: "Updated Title"
  //     };
  //     const updatedUser = await userController.updateUser(UserStub().username, updatedUserObject);
  //     expect(updatedUser.username).toBe(updatedUserObject.username);
  //   });
  //   it("Não encontra o ID do objeto a atualizar e retorna null", async () => {
  //     const res = await userController.updateUser(UserStub().username, UserStub());
  //     expect(res).toBeNull();
  //   });
  // });

  // describe("[DELETE]", () => {
  //   it("Deleta um objeto pelo seu ID", async () => {
  //     await (new userModel(UserStub()).save());
  //     const savedUser = await userController.getByUsername(UserStub().username);
  //     await userController.deleteUser(UserStub().username);
  //     const deletedUser = await userController.getByUsername(UserStub().username);

  //     expect(savedUser.username).toBe(UserStub().username);
  //     expect(deletedUser).toBeNull();
  //   });
  // });
});
