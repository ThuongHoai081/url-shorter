import { DomainEntity } from 'src/modules/domain/entities/domain.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';

@Entity('urls')
export class UrlEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: 'varchar' })
  originalUrl: string;

  @Column({ nullable: false, type: 'varchar' })
  shortCode: string;

  @Column({ type: 'int', nullable: true })
  userId: number | null;

  @ManyToOne(() => UserEntity, (user) => user.urls, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'userId' })
  user?: UserEntity | null;

  @Column({ type: 'int', nullable: false })
  domainId: number;

  @ManyToOne(() => DomainEntity, (domain) => domain.urls, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'domainId' })
  domain?: DomainEntity | null;

  @Column({ default: 0 })
  visitCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
