// Model Imports
import { Actor } from "../actors/actor.model";
import { Author } from "../authors/author.model";

export class CreateMovieDto {
  title: string;
  summary: string;
  genre: string[];
  writtenBy?: number[];
  starring?: number[];
  countryOfOrigin?: string;
  runningTime?: number;
  distributor?: string;
  releaseDate?: Date;
}
