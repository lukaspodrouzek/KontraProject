import {Controller, Get} from "@nestjs/common";
import {TypesService} from "./types.service";

@Controller('types')
export class TypesController {
    constructor(
        private readonly typesService: TypesService,
    ) {}

    @Get()
    getAllTags() {
        return this.typesService.findAll();
    }
}