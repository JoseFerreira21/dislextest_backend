import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    ManyToOne,
    OneToMany,
  } from 'typeorm';
  import { Alumnos } from 'src/modules/alumno/entities/alumnos.entity';
  
  @Entity()
  export class Grados {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar', length: 255 })
    descripcion: string;
  
    @OneToMany(() => Alumnos, (alumno) => alumno.grado)
    alumnos: Alumnos[];
  }
  