import { Test, TestingModule } from "@nestjs/testing";
import { MongoMemoryServer } from "mongodb-memory-server";
import { Connection, connect, Model } from "mongoose";
import { getModelToken } from "@nestjs/mongoose";
import { MovieController } from "../../objects/movie/movie.controller";
import { MovieService } from "../../objects/movie/movie.service";
import { Movie, MovieSchema } from "../../objects/movie/movie.schema";
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
    it("(getAll) Busca todos os objetos", async () => {
      await (new movieModel(MovieStub()).save());
      const movies = await movieController.getAll();
      expect(movies.map(m => m._id)).toStrictEqual([MovieStub()._id]);
    });
    it("(getById) Busca um objeto por ID e o retorna", async () => {
      await (new movieModel(MovieStub()).save());
      const movie = await movieController.getById(MovieStub()._id);
      expect(movie._id).toBe(MovieStub()._id);
    });
    it("(getById) Busca um objeto por ID e não o encontra", async () => {
      const movie = await movieController.getById(MovieStub()._id);
      expect(movie).toBeNull();
    });
  });

  describe("[PUT]", () => {
    it("(likeMovie) Registra um Like em um filme", async () => {
      await (new movieModel(MovieStub()).save());
      const updatedMovieObject = {
        ...MovieStub(),
        likes_count: MovieStub().likes_count++
      };
      const updatedMovie = await movieController.likeMovie(MovieStub()._id);
      expect(updatedMovie.likes_count).toBe(updatedMovieObject.likes_count);
    });
    it("(removeLikeMovie) Remove um Like de um filme", async () => {
      const newMovie = {
        ...MovieStub(),
        likes_count: 5
      }
      await (new movieModel(newMovie).save());
      const updatedMovieObject = {
        ...newMovie,
        likes_count: newMovie.likes_count--
      };
      const updatedMovie = await movieController.removeLikeMovie(newMovie._id);
      expect(updatedMovie.likes_count).toBe(updatedMovieObject.likes_count);
    });
    it("(removeLikeMovie) Tenta remover um Like de um filme quando já possui 0 Likes", async () => {
      await (new movieModel(MovieStub()).save());
      const updatedMovieObject = {
        ...MovieStub(),
        likes_count: 0
      };
      const updatedMovie = await movieController.removeLikeMovie(MovieStub()._id);
      expect(updatedMovie.likes_count).toBe(updatedMovieObject.likes_count);
    });
  });
});
