import { Movie } from "src/objects/movie/movie.schema";

export const MovieStub = (): Movie => {
  return {
    _id: "447365",
    adult: false,
    backdrop_path: "/5YZbUmjbMa3ClvSW1Wj3D6XGolb.jpg",
    genres: [ "Science Fiction", "Adventure", "Action" ],
    original_language: "en",
    original_title: "Guardians of the Galaxy Vol. 3",
    overview: "Peter Quill, still reeling from the loss of Gamora, must rally his team around him to defend the universe along with protecting one of their own. A mission that, if not completed successfully, could quite possibly lead to the end of the Guardians as we know them.",
    popularity: 4389.774,
    poster_path: "/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg",
    release_date: "2023-05-04",
    title: "Guardians of the Galaxy Vol. 3",
    video: false,
    likes_count: 0
  };
};
