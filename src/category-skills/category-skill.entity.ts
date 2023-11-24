import { Column,Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'category_skills'})
export class CategorySkill{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name: string

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}