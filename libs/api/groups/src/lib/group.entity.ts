import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { CardEntity } from '@bunch/api/card';
import { Card } from '@bunch/cards/common';
import { GroupDto } from '@bunch/groups/common';

@Entity({
  name: 'groups',
})
export class GroupEntity implements GroupDto {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  uuid!: string;

  @Column()
  name!: string;

  @Column({ name: 'order_cards', nullable: true, type: 'json' })
  orderCards!: Record<string, number>;

  @ManyToMany(() => CardEntity, {
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'cards_groups',
    joinColumn: {
      name: 'group_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'card_id',
      referencedColumnName: 'id',
    },
  })
  cards!: Card[];

  @Column({ nullable: true, length: 256 })
  cover!: string | null;

  @Column()
  owner!: number;

  @Column()
  order!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: string;

  @UpdateDateColumn({ nullable: true, name: 'updated_at' })
  updatedAt!: string;
}
