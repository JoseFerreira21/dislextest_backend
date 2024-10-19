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
} from 'typeorm';

import { Areas } from 'src/modules/area/entities/areas.entity';
import { ResultadoTest } from 'src/modules/resultado_test/entities/resultado_test.entity';
import { ResultadoEjercicios } from 'src/modules/resultado_ejercicio/entities/resultado_ejercicio.entity';

@Entity()
export class ResultadoItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  pObtenido: number;

  @Column({ type: 'varchar', length: 2, nullable: true })
  indicador: string;

  @Column({ type: 'varchar', length: 255 })
  observacion: string;

  @Column({ type: 'integer'})
  tiempoEmpleado: number;

  @ManyToOne(() => Areas, (area) => area.resultadoitems)
  area: Areas;

  @ManyToOne(
    () => ResultadoTest,
    (resultadotest) => resultadotest.resultadoitems,
    { eager: true, cascade: true, onDelete: 'CASCADE' },
  )
  resultadotest: ResultadoTest;

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

  @OneToMany(() => ResultadoEjercicios, (resultadoejercicio) => resultadoejercicio.ejercicio)
  resultadoejercicio: ResultadoEjercicios[];
}
