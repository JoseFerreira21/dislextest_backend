import { EjerciciosOpciones } from 'src/modules/ejercicio_opcion/entities/ejercicio_opcion.entity';
import {
    PrimaryGeneratedColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    Column,
  } from 'typeorm';

   //#9 
  @Entity()
  export class DiccionarioEncerrarSilabasCf {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'jsonb', nullable: true })
    opciones: object;
    
    @Column({ type: 'varchar', length: 255})
    palabra: string;

    @Column({ type: 'varchar', length: 255})
    palabraIncompleta: string;

    @ManyToOne(() => EjerciciosOpciones, (ejercicioOpciones) => ejercicioOpciones.id)
    @JoinColumn()
    ejercicioOpciones: EjerciciosOpciones;
  
  }
  