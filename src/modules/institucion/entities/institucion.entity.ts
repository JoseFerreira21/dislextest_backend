import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    ManyToOne,
    OneToMany,
  } from 'typeorm';
  import { Alumnos } from 'src/modules/alumno/entities/alumnos.entity';
  
  @Entity()
  export class Instituciones {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar', length: 255 })
    tipo: string;

    @Column({ type: 'varchar', length: 255 })
    descripcion: string;

    @Column({ type: 'varchar', length: 255 })
    direccion: string;

    @OneToMany(() => Alumnos, (alumno) => alumno.institucion)
    alumnos: Alumnos[];
  }
  