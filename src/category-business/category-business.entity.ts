import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'category_business' })
export class CategoryBusiness {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;
}
