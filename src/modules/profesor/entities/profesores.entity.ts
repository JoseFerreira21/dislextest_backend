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
import { Alumnos } from 'src/modules/alumno/entities/alumnos.entity';
import { ResultadoTest } from 'src/modules/resultadotest/entities/resultadotest.entity';

@Entity()
export class Profesores {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  entidadId: number;
  
  @OneToOne(() => Entidades, (entidad) => entidad.profesor)
  @JoinColumn()
  entidad: Entidades;

  @Column({ type: 'varchar', length: 50 })
  curso: string;
  
  @ManyToMany(() => Alumnos, (alumno) => alumno.profesor)
  @JoinTable()
  alumnos: Alumnos[];
  
  @OneToMany(()  => ResultadoTest, (resultadotest) => resultadotest.profesor)
  proferesultadotest: ResultadoTest[];

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
