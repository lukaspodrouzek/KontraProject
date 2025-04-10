import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Type} from "./model/type.entity";
import {Repository} from "typeorm";

@Injectable()
export class TypesService {
    constructor(@InjectRepository(Type) private readonly repo: Repository<Type>,) {}

    findAll(): Promise<Type[]> {
        return this.repo.find();
    }
}