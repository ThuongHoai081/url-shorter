import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateKeycloakId1758986242760 implements MigrationInterface {
  name = 'UpdateKeycloakId1758986242760';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "keyCloakId" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_11a2c981d0ce4810ccc5b32b949" UNIQUE ("keyCloakId")`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_role_enum" AS ENUM('GUEST', 'USER', 'ADMIN')`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "role" "public"."users_role_enum" NOT NULL DEFAULT 'USER'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_11a2c981d0ce4810ccc5b32b949"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "keyCloakId"`);
  }
}
