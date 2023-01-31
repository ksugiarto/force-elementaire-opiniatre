
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

export abstract class IQuery {
    abstract actors(): Nullable<Nullable<Actor>[]> | Promise<Nullable<Nullable<Actor>[]>>;

    abstract authors(): Nullable<Nullable<Author>[]> | Promise<Nullable<Nullable<Author>[]>>;
}

export abstract class IMutation {
    abstract createActor(createActorInput?: Nullable<CreateActorInput>): Nullable<Actor> | Promise<Nullable<Actor>>;

    abstract createAuthor(createAuthorInput?: Nullable<CreateAuthorInput>): Nullable<Author> | Promise<Nullable<Author>>;
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

type Nullable<T> = T | null;
