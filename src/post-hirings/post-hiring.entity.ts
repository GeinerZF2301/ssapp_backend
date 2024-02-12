import { Skill } from "../skills/skill.entity";
import { User } from "../users/user.entity";
import { Column, Double, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'post_hirings'})
export class PostHiring{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @Column({ type: 'date' })
    date: Date;

    @Column({ type: 'varchar' })
    type_event: string;

    @Column({type: 'double'})
    monto: number

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToMany(() => Skill)
    @JoinTable()
    skills: Skill[];
}