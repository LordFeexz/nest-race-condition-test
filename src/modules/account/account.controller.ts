import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AccountService } from './account.service';

@Controller('api/v1/account')
export class AccountController {
  @Post('withdraw')
  @HttpCode(200)
  public async withdraw(
    @Body() { accountId, amount }: { accountId: number; amount: number },
  ) {
    return await this.accountService.handleWithdraw(accountId, amount);
  }

  constructor(private readonly accountService: AccountService) {}
}
