import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Account } from '../../models/account';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account) private readonly model: typeof Account,
    private readonly sequelize: Sequelize,
  ) {}

  public async handleWithdraw(id: number, amount: number) {
    const account = await this.model.findByPk(id);
    if (!account) throw new BadRequestException('Account not found');
    if (amount <= 0) throw new BadRequestException('Invalid amount');

    account.balance -= amount;
    await account.save();

    return account;
  }
}
