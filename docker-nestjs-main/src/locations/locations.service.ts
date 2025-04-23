import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './model/location.entity';
import { City } from '../cities/model/city.entity';

@Injectable()
export class LocationsService {
    constructor(
        @InjectRepository(Location)
        private locationRepo: Repository<Location>,
        @InjectRepository(City)
        private cityRepo: Repository<City>,
    ) {}

    findAll() {
        return this.locationRepo.find({ relations: ['city', 'comments'] });
    }

    findById(id: number) {
        return this.locationRepo.findOne({
            where: { id },
            relations: ['city', 'comments'],
        });
    }

    findByCity(cityId: number) {
        return this.locationRepo.find({
            where: { city: { id: cityId } },
            relations: ['city', 'comments'],
        })
    }

    getRating(id: number) {
        return this.locationRepo.find({
            where: { id: id },
            select: ['starRating'],
        })
    }

    async setRating(id: number, starRating: number) {
        await this.locationRepo.update(id, { starRating });
        return { message: 'Rating updated successfully' };
    }

    async create(data: Partial<Location>) {
        const city = await this.cityRepo.findOneBy({ id: data.city.id });
        const location = this.locationRepo.create({ ...data, city });
        return this.locationRepo.save(location);
    }

    async delete(id: number) {
        return this.locationRepo.delete(id);
    }

    async update(id: number, data: { name: string; description: string }) {
        const location = await this.locationRepo.findOneBy({ id });
        if (!location) throw new NotFoundException('Location not found');

        Object.assign(location, data);
        return this.locationRepo.save(location);
    }

}
