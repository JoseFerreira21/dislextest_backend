import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ejercicios } from './entities/ejercicios.entity';



@Module({
  imports: [TypeOrmModule.forFeature([Ejercicios])], 
  controllers: [],
  providers: [],
  exports: [],
})
export class EjercicioModule {}
