import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DiccionarioController } from './controller/diccionario.controller';
import { DiccionarioService } from './service/diccionario.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([]),
  ],
  controllers: [DiccionarioController],
  providers: [DiccionarioService],
  exports: [DiccionarioService],
})
export class DiccionarioModule {}
