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

import { ResultadoItem } from 'src/modules/resultado_test_item/entities/resultado_item.entity';
import { Ejercicios } from 'src/modules/ejercicio/entities/ejercicios.entity';

@Entity()
export class Areas {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  descripcion: string;

  @Column({ type: 'int' })
  'pEsperado': number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  'pMinimo': number;

  @Column({ type: 'varchar', length: 200 })
  'observacionSR': string;

  @Column({ type: 'varchar', length: 200 })
  'observacionR': string;

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
