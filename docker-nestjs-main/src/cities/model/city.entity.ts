import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Location } from '../../locations/model/location.entity';

@Entity()
export class City {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    imagePath: string;

    @OneToMany(() => Location, (location) => location.city)
    locations: Location[];
}