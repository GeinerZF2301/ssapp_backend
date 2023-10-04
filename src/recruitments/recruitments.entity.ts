import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/users/user.entity';

@Entity({ name: 'recruitments' })

export class Recruitment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date_hire: Date;

  @Column({ type: 'time' })
  start_time: string;

  @Column({ type: 'time' })
  end_time: string;

  @Column({ type: 'varchar' })
  event_location: string;

  @Column({ type: 'varchar' })
  type_event: string;

  @Column({ type: 'double precision' })
  agreed_rate: number;

  @Column({ type: 'varchar' })
  payment_status: string;

  @Column({ type: 'date' })
  payment_date: Date;

  @ManyToOne(() => User)
  musician: User; 

  @ManyToOne(() => User)
  contractor: User;


}
