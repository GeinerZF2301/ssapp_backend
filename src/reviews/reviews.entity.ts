import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany,
    JoinTable } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Recruitment } from 'src/recruitments/recruitments.entity';

@Entity({ name: 'reviews' })
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  review: number;

  @Column({ type: 'varchar' })
  description: string;
  
  @Column({type: 'integer'})
  musicianId: number
  
  @Column({type: 'integer'})
  contractorId: number

  @ManyToOne(() => Recruitment)
  recruitment: Recruitment; 

}
