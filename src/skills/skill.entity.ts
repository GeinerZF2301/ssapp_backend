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
@Entity({ name: 'skills' })
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToOne(() => CategorySkill)
    @JoinColumn({ name: 'categoryId' })
    category: CategorySkill;
}
