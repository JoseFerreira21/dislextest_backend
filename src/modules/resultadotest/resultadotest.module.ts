import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ResultadoTestController } from './controller/resultadotest.controller';
import { ResultadoTestService } from './service/resultadotest.service';
import { ResultadoTest } from './entities/resultadotest.entity';

import { ResultadoItem } from '../resultadotestitem//entities/resultadoitem.entity';
import { ResultadoItemController } from '../resultadotestitem/controller/resultadoitem.controller';
@Module({
  imports: [TypeOrmModule.forFeature([ResultadoTest])], 
  controllers: [ResultadoTestController ],
  providers: [ResultadoTestService],
  exports: [ResultadoTestService]
})
export class ResultadoTestModule {}
