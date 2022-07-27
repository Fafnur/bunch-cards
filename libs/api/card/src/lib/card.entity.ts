import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Card } from '@bunch/cards/common';

@Entity({
  name: 'cards',
})
export class CardEntity implements Card {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  uuid!: string;

  @Column({ length: 60 })
  original!: string;

  @Column({ length: 60 })
  translation!: string;

  @Column({ nullable: true, length: 256 })
  cover!: string | null;

  @Column()
  owner!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: string;

  @UpdateDateColumn({ nullable: true, name: 'updated_at' })
  updatedAt!: string;
}
