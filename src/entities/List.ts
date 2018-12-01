import { BaseEntity, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('lists')
export class List extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
