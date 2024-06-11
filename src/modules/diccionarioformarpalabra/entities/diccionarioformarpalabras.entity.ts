import { EjerciciosOpciones } from 'src/modules/ejercicioopcion/entities/ejercicioopcion.entity';
import {
    PrimaryGeneratedColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    Column,
  } from 'typeorm';

  @Entity()
  export class DiccionarioFormarPalabras {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar', length: 30})
    palabra: string;
    
    @ManyToOne(() => EjerciciosOpciones, (ejercicioOpciones) => ejercicioOpciones.id)
    @JoinColumn()
    ejercicioOpciones: EjerciciosOpciones;
  
  }
  