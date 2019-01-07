import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, ManyToOne, JoinColumn } from 'typeorm';
import { List } from './List';
import { Item } from './Item';

@Entity('purchases')
export class Purchase extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => Item)
  @JoinColumn({ name: 'itemId' })
  item: Item;

  @ManyToOne(type => List, list => list.purchases)
  @JoinColumn({ name: 'listId' })
  list: List;

  @Column('varchar', { nullable: true })
  amount: string;

  @Column('int')
  quantity: number;

  @Column({ nullable: true })
  itemId: string;

  @Column({ nullable: true })
  listId: string;
}
