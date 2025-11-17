import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Account } from './models/account';
import { AccountModule } from './modules/account/account.module';
const conf = require('../config/config.js');

@Module({
  imports: [
    SequelizeModule.forRoot({
      ...conf.development,
      dialect: 'postgres',
      timezone: '+07:00',
      benchmark: true,
      pool: {
        idle: 5,
        max: 20,
        acquire: 10000,
      },
      models: [Account],
    }),
    AccountModule,
  ],
})
export class AppModule {}
