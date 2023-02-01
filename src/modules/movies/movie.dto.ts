import { Actor } from "../actors/actor.model";
import { Author } from "../authors/author.model";

export class CreateMovieDto {
  title: string;
  summary: string;
  genre: string[];
  writtenBy: Author[];
  starring: Actor[];
  countryOfOrigin: string;
  runningTime: number;
  distributor: string;
  releaseDate: Date;
}
