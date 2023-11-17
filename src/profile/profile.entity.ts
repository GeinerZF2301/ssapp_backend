import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

@Entity({name: 'profiles'})

export class Profile{

    @PrimaryColumn()
    id : uuidv4;

    @Column({ type: 'varchar', length: 30 })
    name: string;
  
    @Column({ type: 'varchar', length: 30 })
    lastname1: string;

    @Column({ type: 'varchar', length: 30 })
    lastname2: string;

    @Column({ type: 'datetime'})
    birthDate: Date;

    @Column({ type: 'int' })
    phone_number: number;

    @Column({ type: 'varchar', length: 40 })
    state: string;
  
    @Column({ type: 'varchar', length: 40 })
    city: string;
  
    @Column({ type: 'varchar', length: 40 })
    street: string;
  
    @Column({ type: 'varchar' })
    address: string;

    @Column({ type: 'integer' })
    postalCode: number;

    @Column({ type: 'varchar' })
    avatar_route: string;
  
    @Column({ type: 'varchar' })
    avatar_filename: string;

    @Column({ type: 'varchar' })
    occupation: string;
  
    @Column({ type: 'varchar' })
    interest: string;

    @Column({ type: 'varchar' })
    facebook: string;
  
    @Column({ type: 'varchar' })
    instagram: string;

    @Column({ type: 'varchar' })
    tiktok: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user: User;
}