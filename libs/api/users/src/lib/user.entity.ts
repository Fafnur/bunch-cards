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

  @Column({ unique: true })
  email!: string;

  @Column()
  firstname!: string;

  @Column()
  lastname!: string;

  @Column({ nullable: true })
  photo!: string | null;

  @Column({ nullable: true })
  password!: string | null;

  @Column({ nullable: true })
  reset!: string | null;

  @Column({ nullable: true, name: 'reset_at' })
  resetAt!: string | null;

  @Column({ nullable: true })
  confirm!: string | null;

  @Column({ nullable: true, name: 'confirm_at' })
  confirmAt!: string | null;

  @Column({ length: 60 })
  username!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: string;

  @UpdateDateColumn({ nullable: true, name: 'updated_at' })
  updatedAt!: string;
}
