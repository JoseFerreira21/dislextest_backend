import {MigrationInterface, QueryRunner} from "typeorm";

export class addColumnNombreInTableUsuarios1692139339169 implements MigrationInterface {
    name = 'addColumnNombreInTableUsuarios1692139339169'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" ALTER COLUMN "nombre" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" ALTER COLUMN "nombre" DROP NOT NULL`);
    }

}
