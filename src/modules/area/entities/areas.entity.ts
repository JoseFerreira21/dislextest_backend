import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { ResultadoItem } from 'src/modules/resultadotestitem/entities/resultadoitem.entity';

@Entity()
export class Areas {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  descripcion: string;
  
  @Column({ type: 'int' })
  @Column()
  "pEsperado": number;
  
  @OneToMany(()  => ResultadoItem, (resultadoitem) => resultadoitem.area)
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

}