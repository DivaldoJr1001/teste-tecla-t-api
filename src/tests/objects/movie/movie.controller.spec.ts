import { Test, TestingModule } from "@nestjs/testing";
import { MongoMemoryServer } from "mongodb-memory-server";
import { Connection, connect, Model, MongooseError } from "mongoose";
import { getModelToken } from "@nestjs/mongoose";
import { MovieController } from "../../../objects/movie/movie.controller";
import { MovieService } from "../../../objects/movie/movie.service";
import { Movie, MovieSchema } from "../../../objects/movie/movie.schema";
import { MovieStub } from "./movie.stub";
import { JwtService } from "@nestjs/jwt";


describe("MovieController", () => {
  let movieController: MovieController;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let movieModel: Model<Movie>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    movieModel = mongoConnection.model(Movie.name, MovieSchema);
    const movie: TestingModule = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [
        MovieService,
        JwtService,
        {provide: getModelToken(Movie.name), useValue: movieModel},
      ],
    }).compile();
    movieController = movie.get<MovieController>(MovieController);
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
    it("Busca todos os objetos", async () => {
      await (new movieModel(MovieStub()).save());
      const movies = await movieController.getAll();
      expect(movies.map(m => m._id)).toStrictEqual([MovieStub()._id]);
    });
    it("Busca um objeto por ID e o retorna", async () => {
      await (new movieModel(MovieStub()).save());
      const movie = await movieController.getById(MovieStub()._id);
      expect(movie._id).toBe(MovieStub()._id);
    });
    it("Busca um objeto por ID e não o encontra", async () => {
      const movie = await movieController.getById(MovieStub()._id);
      expect(movie).toBeNull();
    });
  });

  // describe("[POST]", () => {
  //   it("Cria o objeto pela primeira vez", async () => {
  //     const createdMovie = await movieController.createMovie(MovieStub());
  //     expect(createdMovie.title).toBe(MovieStub().title);
  //   });
  //   it("Tenta criar um objeto idêntico e retorna erro de objeto duplicado", async () => {
  //     await (new movieModel(MovieStub()).save());
  //     await expect(movieController.createMovie(MovieStub()))
  //       .rejects
  //       .toThrow(Error)
  //   });
  // });

  describe("[PUT]", () => {
    it("Atualiza um objeto salvo pelo seu ID", async () => {
      await (new movieModel(MovieStub()).save());
      const updatedMovieObject = {
        ...MovieStub(),
        title: "Updated Title"
      };
      const updatedMovie = await movieController.updateMovie(MovieStub()._id, updatedMovieObject);
      expect(updatedMovie.title).toBe(updatedMovieObject.title);
    });
    it("Não encontra o ID do objeto a atualizar e retorna null", async () => {
      const res = await movieController.updateMovie(MovieStub()._id, MovieStub());
      expect(res).toBeNull();
    });
  });

  // describe("[DELETE]", () => {
  //   it("Deleta um objeto pelo seu ID", async () => {
  //     await (new movieModel(MovieStub()).save());
  //     const savedMovie = await movieController.getById(MovieStub()._id);
  //     await movieController.deleteMovie(MovieStub()._id);
  //     const deletedMovie = await movieController.getById(MovieStub()._id);

  //     expect(savedMovie._id).toBe(MovieStub()._id);
  //     expect(deletedMovie).toBeNull();
  //   });
  // });
});
