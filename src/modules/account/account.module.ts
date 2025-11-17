import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Account } from '../../models/account';
import { AccountController } from './account.controller';

@Module({
  imports: [SequelizeModule.forFeature([Account])],
  providers: [AccountService],
  controllers: [AccountController],
})
export class AccountModule {}
