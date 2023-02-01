
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateActorInput {
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    email?: Nullable<string>;
    birthdate?: Nullable<string>;
    birthplace?: Nullable<string>;
}

export class CreateAuthorInput {
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    email?: Nullable<string>;
    birthdate?: Nullable<string>;
    birthplace?: Nullable<string>;
}

export class CreateMovieInput {
    title: string;
    summary: string;
    genre?: Nullable<Nullable<string>[]>;
    writtenBy?: Nullable<Nullable<number>[]>;
    starring?: Nullable<Nullable<number>[]>;
    countryOrOrigin?: Nullable<string>;
    runningTime?: Nullable<number>;
    distributor?: Nullable<string>;
    releaseDate?: Nullable<string>;
}

export abstract class IQuery {
    abstract actors(): Nullable<Nullable<Actor>[]> | Promise<Nullable<Nullable<Actor>[]>>;

    abstract authors(): Nullable<Nullable<Author>[]> | Promise<Nullable<Nullable<Author>[]>>;

    abstract movies(): Nullable<Nullable<Movie>[]> | Promise<Nullable<Nullable<Movie>[]>>;

    abstract movie(id: number): Nullable<Movie> | Promise<Nullable<Movie>>;
}

export abstract class IMutation {
    abstract createActor(createActorInput?: Nullable<CreateActorInput>): Nullable<Actor> | Promise<Nullable<Actor>>;

    abstract createAuthor(createAuthorInput?: Nullable<CreateAuthorInput>): Nullable<Author> | Promise<Nullable<Author>>;

    abstract createMovie(createMovieInput?: Nullable<CreateMovieInput>): Nullable<Movie> | Promise<Nullable<Movie>>;

    abstract updateMovie(id: number, updateMovieInput?: Nullable<CreateMovieInput>): Nullable<Movie> | Promise<Nullable<Movie>>;

    abstract removeMovie(id: number): Nullable<number> | Promise<Nullable<number>>;
}

export class Actor {
    id?: Nullable<number>;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    isActive?: Nullable<boolean>;
    email?: Nullable<string>;
    birthdate?: Nullable<string>;
    birthplace?: Nullable<string>;
}

export class Author {
    id?: Nullable<number>;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    isActive?: Nullable<boolean>;
    email?: Nullable<string>;
    birthdate?: Nullable<string>;
    birthplace?: Nullable<string>;
}

export class Movie {
    id?: Nullable<number>;
    title?: Nullable<string>;
    summary?: Nullable<string>;
    genre?: Nullable<Nullable<string>[]>;
    writtenBy?: Nullable<Nullable<Author>[]>;
    starring?: Nullable<Nullable<Actor>[]>;
    countryOrOrigin?: Nullable<string>;
    runningTime?: Nullable<number>;
    distributor?: Nullable<string>;
    releaseDate?: Nullable<string>;
}

type Nullable<T> = T | null;
