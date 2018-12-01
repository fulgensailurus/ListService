import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, ManyToOne } from 'typeorm';
import { List } from './List'
import { Item } from './Item'


@Entity('purchases')
export class Purchase extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => Item)
  item: Item

  @ManyToOne(type => List, list => list.purchases)
  list: List

  amount: number
}
