import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { City } from '../../cities/model/city.entity';
import { Comment } from '../../comments/model/comment.entity';

@Entity()
export class Location {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    imagePath: string;

    @Column('text')
    description: string;

    @Column()
    tag: string;

    @Column()
    starRating: number;

    @ManyToOne(() => City, city => city.locations, { onDelete: 'CASCADE' })
    city: City;

    @OneToMany(() => Comment, comment => comment.location)
    comments: Comment[];
}
