import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiccionarioDiscriminacionVisual } from './entities/diccionariodiscriminacionvisual.entity'; 

@Module({
  imports: [TypeOrmModule.forFeature([DiccionarioDiscriminacionVisual])], 
  controllers: [],
  providers: [],
  exports: [],
})
export class DiccionarioDiscriminacionVisualModule {}
