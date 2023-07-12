export class MovieDTO {
  readonly _id: number;
  readonly adult: boolean;
  readonly backdrop_path: string;
  readonly genres: string[];
  readonly original_language: string;
  readonly original_title: string;
  readonly overview: string;
  readonly popularity: number;
  readonly poster_path: string;
  readonly release_date: string;
  readonly title: string;
  readonly video: boolean;
  readonly likes_count: number;
}
