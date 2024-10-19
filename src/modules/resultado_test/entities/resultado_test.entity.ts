import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
  ManyToOne,
  JoinColumn,
  JoinTable,
} from 'typeorm';

import { Alumnos } from 'src/modules/alumno/entities/alumnos.entity';
import { Profesores } from 'src/modules/profesor/entities/profesores.entity';
import { ResultadoItem } from 'src/modules/resultado_test_item/entities/resultado_item.entity';

@Entity()
export class ResultadoTest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 2, nullable: true})
  indicador: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  observacion: string;

  @Column({ type: 'integer'})
  tiempoTotal: number;

  @Column({ type: 'int' })
  alumnoId: number;

  @Column({ type: 'int' })
  profesorId: number;

  @ManyToOne(() => Alumnos, (alumno) => alumno.aluresultadotest)
  @JoinColumn()
  alumno: Alumnos;

  @ManyToOne(() => Profesores, (profesor) => profesor.proferesultadotest)
  @JoinColumn()
  profesor: Profesores;

  @OneToMany(
    () => ResultadoItem,
    (resultadoitem) => resultadoitem.resultadotest,
    //{ eager: true, cascade: true, onDelete: 'CASCADE' },
  )
  resultadoitems: ResultadoItem[];

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;
}
