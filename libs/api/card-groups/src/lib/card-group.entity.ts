import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { CardEntity } from '@bunch/api/card';
import { Card, CardGroup } from '@bunch/cards/common';

@Entity({
  name: 'cards_groups',
})
export class CardGroupEntity implements CardGroup {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToMany(() => CardEntity, {
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'cards_groups_cards',
    joinColumn: {
      name: 'card_group_id',
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

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: string;

  @UpdateDateColumn({ nullable: true, name: 'updated_at' })
  updatedAt!: string;
}
