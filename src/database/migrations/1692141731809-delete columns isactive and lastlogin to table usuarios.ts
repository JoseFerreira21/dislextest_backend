import {MigrationInterface, QueryRunner} from "typeorm";

export class deleteColumnsIsactiveAndLastloginToTableUsuarios1692141731809 implements MigrationInterface {
    name = 'deleteColumnsIsactiveAndLastloginToTableUsuarios1692141731809'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "lastLogin"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "lastLogin" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "isActive" character varying(1) NOT NULL`);
    }

}
