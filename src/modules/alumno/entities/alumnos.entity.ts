import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
  ManyToMany,
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

  @OneToOne(() => Entidades, (entidad) => entidad.alumno)
  @JoinColumn()
  entidad: Entidades;

  @ManyToMany(() => Profesores, (profesor) => profesor.alumnos)
  profesor: Profesores[]; 

  @OneToMany(()  => ResultadoTest, (resultadotest) => resultadotest.alumno)
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
