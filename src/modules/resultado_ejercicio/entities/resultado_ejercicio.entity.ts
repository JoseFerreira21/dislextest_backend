import { Alumnos } from 'src/modules/alumno/entities/alumnos.entity';
import { Ejercicios } from 'src/modules/ejercicio/entities/ejercicios.entity';
import { EjerciciosOpciones } from 'src/modules/ejercicio_opcion/entities/ejercicio_opcion.entity';
import { ResultadoItem } from 'src/modules/resultado_test_item/entities/resultado_item.entity';
import {
    PrimaryGeneratedColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    Column,
  } from 'typeorm';
  
  
  @Entity()
  export class ResultadoEjercicios {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => Ejercicios, (ejercicio) => ejercicio.id)
    @JoinColumn()
    ejercicio: Ejercicios;

    @ManyToOne(() => EjerciciosOpciones, (ejercicioOpciones) => ejercicioOpciones.id)
    @JoinColumn()
    ejercicioOpciones: EjerciciosOpciones;

    @ManyToOne(() => Alumnos, (alumno) => alumno.id)
    @JoinColumn()
    alumno: Alumnos;

    @ManyToOne(() => ResultadoItem, (resultadoitem) => resultadoitem.id)
    @JoinColumn()
    resultadoitem: ResultadoItem;
  
    @Column({ type: 'varchar', length: 30})
    respuestaRespondida: string;

    @Column({ type: 'boolean'})
    acierto: boolean;
  }
  