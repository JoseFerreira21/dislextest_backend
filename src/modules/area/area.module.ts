import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AreaController } from './controller/area.controller';
import { Areas } from './entities/areas.entity';
import { AreaService } from './service/area.service';

import { ResultadoItemController } from '../resultadotestitem/controller/resultadoitem.controller';
import { ResultadoItemService } from '../resultadotestitem//service/resultadoitem.service';
import { ResultadoItem } from '../resultadotestitem//entities/resultadoitem.entity';



@Module({
  imports: [TypeOrmModule.forFeature([Areas])], 
  controllers: [AreaController],
  providers: [AreaService],
  exports: [AreaService],
})
export class AreaModule {}
