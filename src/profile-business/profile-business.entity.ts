import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { CategoryBusiness } from 'src/category-business/category-business.entity';
  import { User } from 'src/users/user.entity';
  
  @Entity({ name: 'profile_business' })
  export class ProfileBusiness {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar', length: 30 })
    owner_name: string;
  
    @Column({ type: 'varchar', length: 30 })
    owner_lastname1: string;
  
    @Column({ type: 'varchar', length: 30 })
    owner_lastname2: string;
  
    @Column({ type: 'varchar' })
    business_name: string;
  
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
  
   // @Column({ type: 'varchar' })
   // days_of_the_week: string;
  
   @Column({ type: 'varchar' })
   days_of_the_week: string;
   
   

    @Column({ type: 'time' })
    openingTime: string;
  
    @Column({ type: 'time' })
    closingTime: string;
  
    @Column({ type: 'varchar' })
    avatar_route: string;
  
    @Column({ type: 'varchar' })
    avatar_filename: string;
  
    @Column({ type: 'varchar' })
    about: string;
  
    @Column({ type: 'varchar' })
    facebook: string;
  
    @Column({ type: 'varchar' })
    instagram: string;
  
    @ManyToOne(() => CategoryBusiness)
    @JoinColumn({ name: 'categoryId' })
    category: CategoryBusiness;
  
    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user: User;
  }
  