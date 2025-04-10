import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CommentsService} from "../comments/comments.service";
import { Location } from './model/location.entity';

@Controller('place')
export class LocationsController {
    constructor(
        private readonly service: LocationsService,
        private readonly commentsService: CommentsService,
    ) {}

    @Get(':id')
    getOne(@Param('id') id: number): Promise<Location> {
        return this.service.findById(+id);
    }

    @Get(':id/comments')
    getComments(@Param('id') id: number) {
        return this.commentsService.findByLocation(+id);
    }

    @Get('by-city/:cityId')
    getByCity(@Param('cityId') cityId: number) {
        return this.service.findByCity(+cityId);
    }

    @Get(':id/rating')
    getRating(@Param('id') id: number) {
        return this.service.getRating(+id);
    }

    @Post(':id/rating')
    setRating(@Param('id') id: number, @Body('rating') rating: number) {
        return this.service.setRating(id, rating);
    }

    @Post()
    create(@Body() data: Partial<Location>) {
        return this.service.create(data);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.service.delete(+id);
    }
}
