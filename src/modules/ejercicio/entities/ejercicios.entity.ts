import { PrimaryGeneratedColumn, Entity, OneToOne, JoinColumn, OneToMany } from 'typeorm';

import { Areas } from 'src/modules/area/entities/areas.entity';
import { EjerciciosOpciones } from 'src/modules/ejercicioopcion/entities/ejercicioopcion.entity';
import { ResultadoEjercicios } from 'src/modules/resultadoejercicio/entities/resultadoejercicio.entity';

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