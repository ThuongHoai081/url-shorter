import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUsernameAndPasswordToUser1758707182457
  implements MigrationInterface
{
  name = 'AddUsernameAndPasswordToUser1758707182457';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "username" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username")`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "password" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
  }
}
