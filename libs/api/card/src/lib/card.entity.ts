import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { GroupEntity } from '@bunch/api-groups';
import { Card } from '@bunch/cards/common';
import { Group } from '@bunch/groups/common';

@Entity({
  name: 'cards',
})
export class CardEntity implements Card {
  @PrimaryColumn({ length: 36 })
  uuid!: string;

  @Column({ length: 60 })
  original!: string;

  @Column({ length: 60 })
  translation!: string;

  @Column({ nullable: true, length: 256 })
  cover!: string | null;

  @ManyToOne(() => GroupEntity, (group) => group.cards)
  @JoinColumn({ name: 'group_uuid', referencedColumnName: 'uuid' })
  group!: Group;

  @Column({ nullable: false, name: 'group_uuid' })
  groupUuid!: string;

  @Column()
  owner!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: string;

  @UpdateDateColumn({ nullable: true, name: 'updated_at' })
  updatedAt!: string;
}
