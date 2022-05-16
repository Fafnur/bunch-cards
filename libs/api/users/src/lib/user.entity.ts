import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { User, UserStatus } from '@bunch/users/common';

@Entity({
  name: 'users',
})
export class UserEntity implements User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.Created,
  })
  status!: UserStatus;

  @Column()
  email!: string;

  @Column()
  firstname!: string;

  @Column()
  lastname!: string;

  @Column({ nullable: true })
  photo!: string;

  @Column({ nullable: true })
  password!: string;

  @Column({ nullable: true })
  reset!: string;

  @Column({ nullable: true })
  oauth!: string;

  @Column({ nullable: true })
  resetAt!: string;

  @Column({ length: 60, unique: true })
  username!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: string;

  @UpdateDateColumn({ nullable: true, name: 'updated_at' })
  updatedAt!: string;
}
