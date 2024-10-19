import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ResultadoTestController } from './controller/resultado_test.controller';
import { ResultadoTestService } from './service/resultado_test.service';
import { ResultadoTest } from './entities/resultado_test.entity';

import { ResultadoItem } from '../resultado_test_item/entities/resultado_item.entity';
import { ResultadoItemController } from '../resultado_test_item/controller/resultado_item.controller';
@Module({
  imports: [TypeOrmModule.forFeature([ResultadoTest])], 
  controllers: [ResultadoTestController ],
  providers: [ResultadoTestService],
  exports: [ResultadoTestService]
})
export class ResultadoTestModule {}
