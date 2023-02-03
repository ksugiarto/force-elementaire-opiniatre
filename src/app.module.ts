// Generic Imports
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { GraphQLModule } from '@nestjs/graphql';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';
import { join } from 'path';

// Module Imports
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AuthorsModule } from './modules/authors/authors.module';
import { ActorsModule } from './modules/actors/actors.module';
import { MoviesModule } from './modules/movies/movies.module';

@Module({
  imports: [
    // Initialize environment for global
    ConfigModule.forRoot({ isGlobal: true }),
    // Initialize database
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        dialect: 'postgres',
        uri: configService.get('DB_URL'),
        autoLoadModels: true,
        synchronize: true,
      })
    }),
    // Initialize GraphQL
    GraphQLModule.forRoot<MercuriusDriverConfig>({
      driver: MercuriusDriver,
      graphiql: true,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
      }
    }),
    AuthModule,
    UsersModule,
    AuthorsModule,
    ActorsModule,
    MoviesModule,
  ],
})
export class AppModule {}
