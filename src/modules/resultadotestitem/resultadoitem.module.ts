import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ResultadoItemController } from './controller/resultadoitem.controller';
import { ResultadoItemService } from './service/resultadoitem.service';
import { ResultadoItem } from './entities/resultadoitem.entity';

import { ResultadoTestController } from '../resultadotest/controller/resultadotest.controller';
import { ResultadoTestService } from '../resultadotest/service/resultadotest.service';
import { ResultadoTest } from '../resultadotest/entities/resultadotest.entity';

import { AreaController } from '../area/controller/area.controller';
import { AreaService } from '../area/service/area.service';
import { Areas } from '../area/entities/areas.entity';


@Module({
  imports: [TypeOrmModule.forFeature([ResultadoItem, ResultadoTest, Areas])], 
  controllers: [ResultadoItemController],
  providers: [ResultadoItemService],
  exports : [ResultadoItemService]
})
export class ResultadoItemModule {}
