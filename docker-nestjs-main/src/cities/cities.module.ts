import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitiesController } from './cities.controller';
import { CitiesService } from './cities.service';
import { City } from './model/city.entity';
import {LocationsModule} from "../locations/locations.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([City]),
        LocationsModule,
    ],
    controllers: [CitiesController],
    providers: [CitiesService],
})
export class CitiesModule {}