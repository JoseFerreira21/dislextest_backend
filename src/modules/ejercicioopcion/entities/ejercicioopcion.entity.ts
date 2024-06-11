import {
  PrimaryGeneratedColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  Column,
  OneToMany,
} from 'typeorm';
import { Ejercicios } from 'src/modules/ejercicio/entities/ejercicios.entity';
import { DiccionarioFormarPalabras } from 'src/modules/diccionarioformarpalabra/entities/diccionarioformarpalabras.entity';
import { ResultadoEjercicios } from 'src/modules/resultadoejercicio/entities/resultadoejercicio.entity';
import { DiccionarioDiscriminacionVisual } from 'src/modules/diccionariodiscriminacionvisual/entities/diccionariodiscriminacionvisual.entity';
import { DiccionarioDiscriminacionPalabras } from 'src/modules/diccionariodiscriminacionpalabra/entities/diccionariodiscriminacionpalabras.entity';

@Entity()
export class EjerciciosOpciones {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Ejercicios, (ejercicio) => ejercicio.id)
  @JoinColumn()
  ejercicio: Ejercicios;

  @Column({ type: 'varchar', length: 30})
  respuesta: string;

  @OneToMany(() => DiccionarioFormarPalabras, (diccionarioformarpalabra) => diccionarioformarpalabra.ejercicioOpciones)
  diccionarioformarpalabra: DiccionarioFormarPalabras[];

  @OneToMany(() => DiccionarioDiscriminacionVisual, (diccionariodiscriminacionvisual) => diccionariodiscriminacionvisual.ejercicioOpciones)
  diccionariodiscriminacionvisual: DiccionarioDiscriminacionVisual[];

  @OneToMany(() => DiccionarioDiscriminacionPalabras, (diccionariodiscriminacionpalabra) => diccionariodiscriminacionpalabra.ejercicioOpciones)
  diccionariodiscriminacionpalabra: DiccionarioDiscriminacionPalabras[];

  @OneToMany(() => ResultadoEjercicios, (resultadoejercicio) => resultadoejercicio.ejercicio)
  resultadoejercicio: ResultadoEjercicios[];

}
