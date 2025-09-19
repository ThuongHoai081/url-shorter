import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { UserEntity } from '../../modules/user/entities/user.entity';
import { userFactory } from '../factories/user.factory';

export class UserSeed implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repo = dataSource.getRepository(UserEntity);
    const itemsPromises = Array.from({ length: 10 }, () => userFactory());
    const items = await Promise.all(itemsPromises);
    await repo.insert(items);
  }
}
