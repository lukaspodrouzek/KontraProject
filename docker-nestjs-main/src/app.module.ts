import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {TypeOrmModule, TypeOrmModuleOptions} from '@nestjs/typeorm';
import {CitiesModule} from "./cities/cities.module";
import {LocationsModule} from "./locations/locations.module";
import {TypesModule} from "./types/types.module";
import {CommentsModule} from "./comments/comments.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        type: 'mysql',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [__dirname + '/**/model/*.entity{.ts,.js}'],
        synchronize: false, // Set to true only in development
      }),
      inject: [ConfigService],
    }),
    CitiesModule,
    LocationsModule,
    CommentsModule,
    TypesModule,
  ],
})
export class AppModule {} 