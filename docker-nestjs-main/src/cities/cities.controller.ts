import {Controller, Get, Param, Post, Body, Put} from '@nestjs/common';
import { CitiesService } from './cities.service';
import {LocationsService} from "../locations/locations.service";

@Controller('cities')
export class CitiesController {
    constructor(
        private readonly citiesService: CitiesService,
        private readonly locationsService: LocationsService,
    ) {}

    @Get()
    getAllCities() {
        return this.citiesService.findAll();
    }

    @Get(':id/places')
    getPlacesByCity(@Param('id') id: number) {
        return this.locationsService.findByCity(+id);
    }

    @Post(':id/places')
    createPlaceInCity(@Param('id') id: number, @Body() body: any) {
        return this.locationsService.create({ ...body, city: { id: +id } });
    }
}
