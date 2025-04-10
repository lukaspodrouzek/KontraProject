import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Location } from '../../locations/model/location.entity';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('text')
    description: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => Location, location => location.comments, { onDelete: 'CASCADE' })
    location: Location;
}
