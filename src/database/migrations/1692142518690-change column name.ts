import {MigrationInterface, QueryRunner} from "typeorm";

export class changeColumnName1692142518690 implements MigrationInterface {
    name = 'changeColumnName1692142518690'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" RENAME COLUMN "nombre" TO "name"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" RENAME COLUMN "name" TO "nombre"`);
    }

}
