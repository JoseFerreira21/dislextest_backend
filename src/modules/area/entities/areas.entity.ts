import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { ResultadoItem } from 'src/modules/resultadotestitem/entities/resultadoitem.entity';
import { Ejercicios } from 'src/modules/ejercicio/entities/ejercicios.entity';

@Entity()
export class Areas {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  descripcion: string;

  @Column({ type: 'int' })
  @Column()
  'pEsperado': number;

  @OneToMany(() => ResultadoItem, (resultadoitem) => resultadoitem.area)
  resultadoitems: ResultadoItem[];

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @OneToOne(() => Ejercicios, (ejercicio) => ejercicio.id)
  ejercicio: Ejercicios;
}
