import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './model/city.entity';

@Injectable()
export class CitiesService {
    constructor(@InjectRepository(City) private repo: Repository<City>) {}

    findAll() {
        return this.repo.find({relations: ['locations'] });
    }
}
