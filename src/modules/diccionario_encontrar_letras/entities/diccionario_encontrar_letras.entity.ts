import { EjerciciosOpciones } from 'src/modules/ejercicio_opcion/entities/ejercicio_opcion.entity';
import {
    PrimaryGeneratedColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    Column,
  } from 'typeorm';

   //#4 
  @Entity()
  export class DiccionarioEncontrarLetras {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar', length: 30})
    palabra: string;

    @Column({ type: 'int'})
    grupo: number;

    @Column({ type: 'int'})
    cantidad: number; 
    
    @ManyToOne(() => EjerciciosOpciones, (ejercicioOpciones) => ejercicioOpciones.id)
    @JoinColumn()
    ejercicioOpciones: EjerciciosOpciones;
  
  }
  