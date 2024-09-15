import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ResultadoItemController } from './controller/resultadoitem.controller';
import { ResultadoItemService } from './service/resultadoitem.service';
import { ResultadoItem } from './entities/resultadoitem.entity';

import { ResultadoTest } from '../resultadotest/entities/resultadotest.entity';
import { Areas } from '../area/entities/areas.entity';
import { ResultadoEjercicios } from '../resultadoejercicio/entities/resultadoejercicio.entity';


@Module({
  imports: [TypeOrmModule.forFeature([ResultadoItem, ResultadoTest, Areas])], 
  controllers: [ResultadoItemController],
  providers: [ResultadoItemService],
  exports : [ResultadoItemService]
})
export class ResultadoItemModule {}
