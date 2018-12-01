import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, ManyToOne, JoinColumn } from 'typeorm';
import { List } from './List'
import { Item } from './Item'


@Entity('purchases')
export class Purchase extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => Item)
  @JoinColumn('itemId')
  item: Item

  @ManyToOne(type => List, list => list.purchases)
  @JoinColumn('listId')
  list: List

  @Column('int')
  amount: number

  @Column({nullable: true)
  itemId: string

  @Column({nullable: true)
  listId: string
}
