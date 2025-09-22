import { UrlEntity } from 'src/modules/url/entities/url.entity';
import { DataSource } from 'typeorm';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { DomainEntity } from '../../modules/domain/entities/domain.entity';

export const urlFactory = async (
  dataSource: DataSource,
): Promise<Partial<UrlEntity>> => {
  const { faker } = await import('@faker-js/faker');

  const userRepo = dataSource.getRepository(UserEntity);
  const users = await userRepo.find({ select: ['id'] });

  const domainRepo = dataSource.getRepository(DomainEntity);

  const randomUser =
    users.length > 0
      ? users[faker.number.int({ min: 0, max: users.length - 1 })]
      : null;

  const originalUrl = faker.internet.url();

  const urlObj = new URL(originalUrl);
  const hostname = urlObj.hostname;

  let domain = await domainRepo.findOne({ where: { name: hostname } });
  if (!domain) {
    domain = domainRepo.create({ name: hostname });
    await domainRepo.save(domain);
  }

  return {
    originalUrl,
    shortCode: faker.string.alphanumeric(6),
    userId: randomUser ? randomUser.id : null,
    domainId: domain.id,
    visitCount: faker.number.int({ min: 0, max: 5000 }),
  };
};
