import { PrimaryGeneratedColumn, Entity, OneToOne, JoinColumn, OneToMany } from 'typeorm';

import { Areas } from 'src/modules/area/entities/areas.entity';
import { EjerciciosOpciones } from 'src/modules/ejercicio_opcion/entities/ejercicio_opcion.entity';
import { ResultadoEjercicios } from 'src/modules/resultado_ejercicio/entities/resultado_ejercicio.entity';

@Entity()
export class Ejercicios {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Areas, (area) => area.id)
  @JoinColumn()
  area: Areas;

  @OneToMany(() => EjerciciosOpciones, (ejercicioopciones) => ejercicioopciones.ejercicio)
  ejercicioopciones: EjerciciosOpciones[];

  @OneToMany(() => ResultadoEjercicios, (resultadoejercicio) => resultadoejercicio.ejercicio)
  resultadoejercicio: ResultadoEjercicios[];
  
}