import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { Location } from './model/location.entity';
import { City } from '../cities/model/city.entity';
import {Comment} from "../comments/model/comment.entity";
import {CommentsController} from "../comments/comments.controller";
import {CommentsService} from "../comments/comments.service";

@Module({
    imports: [TypeOrmModule.forFeature([Location, City, Comment])],
    controllers: [LocationsController, CommentsController],
    providers: [LocationsService, CommentsService],
    exports: [LocationsService],
})
export class LocationsModule {}