import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
    constructor(private readonly service: CommentsService) {}

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Get('location/:locationId')
    findByLocation(@Param('locationId') locationId: number) {
        return this.service.findByLocation(locationId);
    }

    @Post()
    create(@Body() data: { name: string; description: string; locationId: number }) {
        return this.service.create(data);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.service.delete(id);
    }
}
