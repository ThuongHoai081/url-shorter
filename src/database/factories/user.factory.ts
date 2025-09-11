import { UserEntity } from 'src/modules/user/entities/user.entity';
//import { faker } from '@faker-js/faker';

export const userFactory = async (): Promise<Partial<UserEntity>> => {
  const { faker } = await import('@faker-js/faker');

  const firstName: string = String(faker.person.firstName());
  const lastName: string = String(faker.person.lastName());
  const email: string = String(faker.internet.email({ firstName, lastName }));

  return {
    firstName,
    lastName,
    email,
  };
};
