import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config'; // 👈 Import ConfigType 
import config from './config/config'; // 👈 config file
import { Client } from 'pg';

@Injectable()
export class AppService {
  constructor(
    @Inject('PG') private clientPg: Client,
    @Inject(config.KEY) private configService: ConfigType<typeof config>, // 👈
  ) {}
}