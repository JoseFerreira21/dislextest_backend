import {MigrationInterface, QueryRunner} from "typeorm";

export class initMigrations1712111815073 implements MigrationInterface {
    name = 'initMigrations1712111815073'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "areas" ("id" SERIAL NOT NULL, "descripcion" character varying(100) NOT NULL, "pEsperado" integer NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_5110493f6342f34c978c084d0d6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "resultado_item" ("id" SERIAL NOT NULL, "pObtenido" integer NOT NULL, "indicador" character varying(2), "observacion" character varying(255) NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "areaId" integer, "resultadotestId" integer, CONSTRAINT "PK_3359f212bb13e957289fbb3b7ee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "resultado_test" ("id" SERIAL NOT NULL, "indicador" character varying(1) NOT NULL, "observacion" character varying(255) NOT NULL, "alumnoId" integer NOT NULL, "profesorId" integer NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_0c049dd40384c3a80ac0a89b5e7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "profesores" ("id" SERIAL NOT NULL, "entidadId" integer NOT NULL, "curso" character varying(50) NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "REL_6505a03d52b3875154708fde72" UNIQUE ("entidadId"), CONSTRAINT "PK_f9adeec6e0091d84e590711c517" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(128) NOT NULL, "role" character varying NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "entidades" ("id" SERIAL NOT NULL, "tipoEntidad" character varying(2) NOT NULL, "nombre" character varying(100) NOT NULL, "apellido" character varying(100) NOT NULL, "fechaNacimiento" date NOT NULL, "telefono" character varying(20) NOT NULL, "direccion" character varying(100) NOT NULL, "nroDocumento" character varying(20) NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "usuarioId" integer, CONSTRAINT "UQ_ca194395b8bbdafce2302f04d93" UNIQUE ("nroDocumento"), CONSTRAINT "REL_3576956507d95e42dc53b05496" UNIQUE ("usuarioId"), CONSTRAINT "PK_4ceb23ee98193c241ee43c95111" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "alumnos" ("id" SERIAL NOT NULL, "entidadId" integer NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "profesorId" integer, CONSTRAINT "REL_9e59c7f6758053845c89a90bd1" UNIQUE ("entidadId"), CONSTRAINT "PK_c9eecfa0d05424c7d272034a706" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "resultado_item" ADD CONSTRAINT "FK_3a187738d0fbb3783da6f714aa6" FOREIGN KEY ("areaId") REFERENCES "areas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "resultado_item" ADD CONSTRAINT "FK_8e86a6d9adf262e36191b6b1993" FOREIGN KEY ("resultadotestId") REFERENCES "resultado_test"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "resultado_test" ADD CONSTRAINT "FK_cf59e34e50561d1fdbba7427ac9" FOREIGN KEY ("alumnoId") REFERENCES "alumnos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "resultado_test" ADD CONSTRAINT "FK_19a52bbb2f16d37df319c02e788" FOREIGN KEY ("profesorId") REFERENCES "profesores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "profesores" ADD CONSTRAINT "FK_6505a03d52b3875154708fde72e" FOREIGN KEY ("entidadId") REFERENCES "entidades"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "entidades" ADD CONSTRAINT "FK_3576956507d95e42dc53b05496f" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "alumnos" ADD CONSTRAINT "FK_2bb3fbfd63f823436a4c8b5c90e" FOREIGN KEY ("profesorId") REFERENCES "profesores"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "alumnos" ADD CONSTRAINT "FK_9e59c7f6758053845c89a90bd1a" FOREIGN KEY ("entidadId") REFERENCES "entidades"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "alumnos" DROP CONSTRAINT "FK_9e59c7f6758053845c89a90bd1a"`);
        await queryRunner.query(`ALTER TABLE "alumnos" DROP CONSTRAINT "FK_2bb3fbfd63f823436a4c8b5c90e"`);
        await queryRunner.query(`ALTER TABLE "entidades" DROP CONSTRAINT "FK_3576956507d95e42dc53b05496f"`);
        await queryRunner.query(`ALTER TABLE "profesores" DROP CONSTRAINT "FK_6505a03d52b3875154708fde72e"`);
        await queryRunner.query(`ALTER TABLE "resultado_test" DROP CONSTRAINT "FK_19a52bbb2f16d37df319c02e788"`);
        await queryRunner.query(`ALTER TABLE "resultado_test" DROP CONSTRAINT "FK_cf59e34e50561d1fdbba7427ac9"`);
        await queryRunner.query(`ALTER TABLE "resultado_item" DROP CONSTRAINT "FK_8e86a6d9adf262e36191b6b1993"`);
        await queryRunner.query(`ALTER TABLE "resultado_item" DROP CONSTRAINT "FK_3a187738d0fbb3783da6f714aa6"`);
        await queryRunner.query(`DROP TABLE "alumnos"`);
        await queryRunner.query(`DROP TABLE "entidades"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
        await queryRunner.query(`DROP TABLE "profesores"`);
        await queryRunner.query(`DROP TABLE "resultado_test"`);
        await queryRunner.query(`DROP TABLE "resultado_item"`);
        await queryRunner.query(`DROP TABLE "areas"`);
    }

}
