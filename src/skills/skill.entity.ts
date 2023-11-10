import {
  Entity,
  PrimaryGeneratedColumn, 
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/users/user.entity';
import { CategorySkill } from '../category-skills/category-skill.entity';
import { PostHiring } from 'src/post-hirings/post-hiring.entity';
@Entity({ name: 'skills' })
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  skill: string;

  @ManyToMany(() => User)
  @JoinTable()
  user: User[];

  @ManyToOne(() => CategorySkill)
    @JoinColumn({ name: 'categoryId' })
    category: CategorySkill;

  @ManyToMany(() => PostHiring, postHiring => postHiring.skills)
  postHirings: PostHiring[];
}
