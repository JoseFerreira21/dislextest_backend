import { EjerciciosOpciones } from 'src/modules/ejercicio_opcion/entities/ejercicio_opcion.entity';
import {
    PrimaryGeneratedColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    Column,
  } from 'typeorm';

   //#6 
  @Entity()
  export class DiccionarioLetrasDesordenadas {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar', length: 30})
    palabra: string;
    
    @ManyToOne(() => EjerciciosOpciones, (ejercicioOpciones) => ejercicioOpciones.id)
    @JoinColumn()
    ejercicioOpciones: EjerciciosOpciones;
  
  }
  