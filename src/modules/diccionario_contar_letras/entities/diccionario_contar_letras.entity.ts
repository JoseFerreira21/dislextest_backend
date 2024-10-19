import { EjerciciosOpciones } from 'src/modules/ejercicio_opcion/entities/ejercicio_opcion.entity';
import {
    PrimaryGeneratedColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    Column,
  } from 'typeorm';

  @Entity()
  export class DiccionarioContarLetras {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 1})
    letra: string;

    @Column({ type: 'varchar', length: 30})
    cantidad: string;
    
    @ManyToOne(() => EjerciciosOpciones, (ejercicioOpciones) => ejercicioOpciones.id)
    @JoinColumn()
    ejercicioOpciones: EjerciciosOpciones;

  }
  