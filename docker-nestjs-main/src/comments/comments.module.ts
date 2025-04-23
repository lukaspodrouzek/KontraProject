import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Comment} from "./model/comment.entity";
import {CommentsController} from "./comments.controller";
import {CommentsService} from "./comments.service";
import {Location} from "../locations/model/location.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Comment, Location])],
    controllers: [CommentsController],
    providers: [CommentsService],
    exports: [CommentsService],
})
export class CommentsModule {}