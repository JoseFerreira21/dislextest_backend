import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';

import { Alumnos } from 'src/modules/alumno/entities/alumnos.entity';
import { Profesores } from 'src/modules/profesor/entities/profesores.entity';
import { Usuarios } from 'src/modules/usuario/entities/usuarios.entity';
import { date } from 'joi';

@Entity()
export class Entidades {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 2 })
  tipoEntidad: string;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  apellido: string;

  @Column({type: 'date', nullable: true})
  fechaNacimiento: Date;

  @Column({ type: 'varchar', length: 20, nullable: true })
  telefono: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  direccion: string;

  @Column({ type: 'varchar', length: 20, unique: true, nullable: true })
  nroDocumento: string;

  @OneToOne(() => Usuarios, (usuario) => usuario.entidad)
  @JoinColumn()
  usuario: Usuarios;

  @OneToOne(() => Alumnos, (alumno) => alumno.entidad)
  alumno: Alumnos;

  @OneToOne(() => Profesores, (profesor) => profesor.entidad, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  profesor: Profesores;

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
