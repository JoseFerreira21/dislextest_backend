import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AreaController } from './controller/area.controller';
import { Areas } from './entities/areas.entity';
import { AreaService } from './service/area.service';

import { ResultadoItemController } from '../resultado_test_item/controller/resultado_item.controller';
import { ResultadoItemService } from '../resultado_test_item/service/resultado_item.service';
import { ResultadoItem } from '../resultado_test_item/entities/resultado_item.entity';



@Module({
  imports: [TypeOrmModule.forFeature([Areas])], 
  controllers: [AreaController],
  providers: [AreaService],
  exports: [AreaService],
})
export class AreaModule {}
