import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  @Column({type: 'integer'})
  musicianId: number
  
  @Column({type: 'integer'})
  contractorId: number
  

}
