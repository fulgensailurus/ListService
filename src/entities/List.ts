import { BaseEntity, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Purchase } from './Purchase'

@Entity('lists')
export class List extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(type => Purchase, purchase => purchase.list, {
    eager: true
  })
  purchases: Purchase[];
}
