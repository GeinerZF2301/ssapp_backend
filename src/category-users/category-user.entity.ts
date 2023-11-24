import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'category-user' })
export class CategoryUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;
}
