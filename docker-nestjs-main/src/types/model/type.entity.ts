import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('location')
export class Type {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tag: string;
}