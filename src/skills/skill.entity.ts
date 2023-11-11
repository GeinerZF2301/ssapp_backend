import {
  Entity,
  PrimaryGeneratedColumn, 
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from 'src/users/user.entity';
@Entity({ name: 'skills' })
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  skill: string;

  @ManyToMany(() => User)
  @JoinTable()
  user: User[];
}
