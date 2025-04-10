import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './model/comment.entity';
import { Location } from '../locations/model/location.entity';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comment)
        private commentRepo: Repository<Comment>,
        @InjectRepository(Location)
        private locationRepo: Repository<Location>,
    ) {}

    findAll() {
        return this.commentRepo.find({
            relations: ['location'],
        });
    }

    findByLocation(locationId: number) {
        return this.commentRepo.find({
            where: { location: { id: locationId } },
            relations: ['location'],
        } as any);
    }

    async create(data: { name: string; description: string; locationId: number }) {
        const location = await this.locationRepo.findOne({ where: { id: data.locationId } });
        if (!location) {
            throw new Error('Location not found');
        }

        const comment = this.commentRepo.create({
            name: data.name,
            description: data.description,
            location,
        });

        return this.commentRepo.save(comment);
    }

    async delete(id: number) {
        const comment = await this.commentRepo.findOne({ where: { id } });
        if (!comment) {
            throw new Error('Comment not found');
        }

        return this.commentRepo.remove(comment);
    }
}