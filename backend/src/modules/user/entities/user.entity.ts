import { UrlEntity } from 'src/modules/url/entities/url.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, type: 'varchar' })
  firstName: string;

  @Column({ nullable: true, type: 'varchar' })
  lastName: string;

  @Column({ unique: true, nullable: true, type: 'varchar' })
  email: string;

  @Column({ unique: true, nullable: false, type: 'varchar' })
  username: string;

  @Column({ nullable: false, type: 'varchar' })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => UrlEntity, (url) => url.user)
  urls: UrlEntity[];
}
