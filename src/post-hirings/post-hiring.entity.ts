import { Skill } from "../skills/skill.entity";
import { User } from "../users/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'post_hirings'})
export class PostHiring{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    contractorUser: User;

    @ManyToMany(() => Skill)
    @JoinTable()
    skills: Skill[];
}