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
import { ResultadoTest } from 'src/modules/resultado_test/entities/resultado_test.entity';

@Entity()
export class Profesores {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  entidadId: number;
  
  
  @OneToMany(
    () => Alumnos,
    (alumno) => alumno.profesor,
    //{ eager: true, cascade: true, onDelete: 'CASCADE' },
  )
  alumno: Alumnos[];
  
  @OneToOne(() => Entidades, (entidad) => entidad.profesor)
  @JoinColumn()
  entidad: Entidades;

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
