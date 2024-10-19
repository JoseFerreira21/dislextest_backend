import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ResultadoItemController } from './controller/resultado_item.controller';
import { ResultadoItemService } from './service/resultado_item.service';
import { ResultadoItem } from './entities/resultado_item.entity';

import { ResultadoTest } from '../resultado_test/entities/resultado_test.entity';
import { Areas } from '../area/entities/areas.entity';
import { ResultadoEjercicios } from '../resultado_ejercicio/entities/resultado_ejercicio.entity';


@Module({
  imports: [TypeOrmModule.forFeature([ResultadoItem, ResultadoTest, Areas])], 
  controllers: [ResultadoItemController],
  providers: [ResultadoItemService],
  exports : [ResultadoItemService]
})
export class ResultadoItemModule {}
