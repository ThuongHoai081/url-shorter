import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDomainAndUrlTablesAndUpdateUser1757650975365 implements MigrationInterface {
    name = 'AddDomainAndUrlTablesAndUpdateUser1757650975365'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "domains" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "userId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_f36af68a2defaa8ae5fdd9b5640" UNIQUE ("name"), CONSTRAINT "PK_05a6b087662191c2ea7f7ddfc4d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "urls" ("id" SERIAL NOT NULL, "originalUrl" character varying NOT NULL, "shortCode" character varying NOT NULL, "userId" integer, "domainId" uuid NOT NULL, "visitCount" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_eaf7bec915960b26aa4988d73b0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "firstName" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastName" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "email" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "domains" ADD CONSTRAINT "FK_6df438a33f1dde9e4e1101c65e7" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "urls" ADD CONSTRAINT "FK_3088b58113241e3f5f6c10cf1fb" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "urls" ADD CONSTRAINT "FK_2ad7f2e45f226587d5f402cbdc8" FOREIGN KEY ("domainId") REFERENCES "domains"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "urls" DROP CONSTRAINT "FK_2ad7f2e45f226587d5f402cbdc8"`);
        await queryRunner.query(`ALTER TABLE "urls" DROP CONSTRAINT "FK_3088b58113241e3f5f6c10cf1fb"`);
        await queryRunner.query(`ALTER TABLE "domains" DROP CONSTRAINT "FK_6df438a33f1dde9e4e1101c65e7"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "email" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastName" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "firstName" SET NOT NULL`);
        await queryRunner.query(`DROP TABLE "urls"`);
        await queryRunner.query(`DROP TABLE "domains"`);
    }

}
