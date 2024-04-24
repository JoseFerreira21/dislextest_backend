import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
  ManyToOne,
  JoinColumn,
  JoinTable,
} from 'typeorm';

import { Entidades } from 'src/modules/entidad/entities/entidades.entity';
import { Profesores } from 'src/modules/profesor/entities/profesores.entity';
import { ResultadoTest } from 'src/modules/resultadotest/entities/resultadotest.entity';

@Entity()
export class Alumnos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  entidadId: number;

  @ManyToOne(() => Profesores, (profesor) => profesor.id, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  profesor: Profesores;

  @OneToOne(() => Entidades, (entidad) => entidad.alumno, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  entidad: Entidades;

  @OneToMany(() => ResultadoTest, (resultadotest) => resultadotest.alumno)
  aluresultadotest: ResultadoTest[];

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
