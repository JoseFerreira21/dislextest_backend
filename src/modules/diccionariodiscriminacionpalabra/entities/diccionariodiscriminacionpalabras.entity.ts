import { EjerciciosOpciones } from 'src/modules/ejercicioopcion/entities/ejercicioopcion.entity';
import {
    PrimaryGeneratedColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    Column,
  } from 'typeorm';

  @Entity()
  export class DiccionarioDiscriminacionPalabras {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar', length: 30})
    palabra: string;

    @Column({ type: 'int'})
    grupo: number;
    
    @ManyToOne(() => EjerciciosOpciones, (ejercicioOpciones) => ejercicioOpciones.id)
    @JoinColumn()
    ejercicioOpciones: EjerciciosOpciones;

  }
  