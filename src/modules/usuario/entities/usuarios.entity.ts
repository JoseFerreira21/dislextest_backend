import { Entidades } from 'src/modules/entidad/entities/entidades.entity';
import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
  } from 'typeorm';

  import { Exclude } from 'class-transformer';
import { Role } from 'src/auth/models/roles.model';
  

@Entity()
export class Usuarios {
  
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Exclude()
  @Column({ type: 'varchar', length: 128 })
  password: string;

  @Column({ type: 'varchar' })
  role: Role;

  @OneToOne(() => Entidades, (entidad) => entidad.usuario)
  entidad: Entidades;

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
