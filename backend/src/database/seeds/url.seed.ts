import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { UrlEntity } from '../../modules/url/entities/url.entity';
import { urlFactory } from '../factories/url.factory';

export class UrlSeed implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repo = dataSource.getRepository(UrlEntity);
    const itemsPromises = Array.from({ length: 120 }, () =>
      urlFactory(dataSource),
    );
    const items = await Promise.all(itemsPromises);
    await repo.insert(items);
  }
}
