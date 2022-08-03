import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { CardEntity } from '@bunch/api/card';
import { Card } from '@bunch/cards/common';
import { GroupDto } from '@bunch/groups/common';

@Entity({
  name: 'groups',
})
export class GroupEntity implements GroupDto {
  @PrimaryColumn({ length: 36 })
  uuid!: string;

  @Column()
  name!: string;

  @Column({ name: 'order_cards', nullable: true, type: 'json' })
  orderCards!: string[];

  @OneToMany(() => CardEntity, (card) => card.group)
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
