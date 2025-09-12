import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDomain1757659142731 implements MigrationInterface {
    name = 'UpdateDomain1757659142731'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "domains" DROP CONSTRAINT "FK_6df438a33f1dde9e4e1101c65e7"`);
        await queryRunner.query(`ALTER TABLE "domains" DROP COLUMN "userId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "domains" ADD "userId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "domains" ADD CONSTRAINT "FK_6df438a33f1dde9e4e1101c65e7" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
