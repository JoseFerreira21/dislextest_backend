import {
  PrimaryGeneratedColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  Column,
  OneToMany,
} from 'typeorm';
import { Ejercicios } from 'src/modules/ejercicio/entities/ejercicios.entity';
import { DiccionarioFormarPalabras } from 'src/modules/diccionario_formar_palabra/entities/diccionario_formar_palabras.entity';
import { ResultadoEjercicios } from 'src/modules/resultado_ejercicio/entities/resultado_ejercicio.entity';
import { DiccionarioDiscriminacionVisual } from 'src/modules/diccionario_discriminacion_visual/entities/diccionario_discriminacion_visual.entity';
import { DiccionarioDiscriminacionPalabras } from 'src/modules/diccionario_discriminacion_palabra/entities/diccionario_discriminacion_palabras.entity';

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
