import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDomain1757659238129 implements MigrationInterface {
    name = 'UpdateDomain1757659238129'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "urls" DROP CONSTRAINT "FK_2ad7f2e45f226587d5f402cbdc8"`);
        await queryRunner.query(`ALTER TABLE "domains" DROP CONSTRAINT "PK_05a6b087662191c2ea7f7ddfc4d"`);
        await queryRunner.query(`ALTER TABLE "domains" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "domains" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "domains" ADD CONSTRAINT "PK_05a6b087662191c2ea7f7ddfc4d" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "urls" DROP COLUMN "domainId"`);
        await queryRunner.query(`ALTER TABLE "urls" ADD "domainId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "urls" ADD CONSTRAINT "FK_2ad7f2e45f226587d5f402cbdc8" FOREIGN KEY ("domainId") REFERENCES "domains"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "urls" DROP CONSTRAINT "FK_2ad7f2e45f226587d5f402cbdc8"`);
        await queryRunner.query(`ALTER TABLE "urls" DROP COLUMN "domainId"`);
        await queryRunner.query(`ALTER TABLE "urls" ADD "domainId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "domains" DROP CONSTRAINT "PK_05a6b087662191c2ea7f7ddfc4d"`);
        await queryRunner.query(`ALTER TABLE "domains" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "domains" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "domains" ADD CONSTRAINT "PK_05a6b087662191c2ea7f7ddfc4d" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "urls" ADD CONSTRAINT "FK_2ad7f2e45f226587d5f402cbdc8" FOREIGN KEY ("domainId") REFERENCES "domains"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
