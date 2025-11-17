import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../app.module';
import { Account } from '../models/account';

describe('Race Condition Withdraw', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {
    // reset balance
    await Account.update({ balance: 10000 }, { where: { id: 1 } });
  });

  afterAll(async () => {
    await app.close();
  });

  it('should prevent race condition', async () => {
    const jobs = Array.from({ length: 5 }).map(() =>
      request(app.getHttpServer())
        .post('/api/v1/account/withdraw')
        .send({ accountId: 1, amount: 2000 })
        .timeout({ response: 5000, deadline: 10000 }),
    );

    const results = await Promise.allSettled(jobs);

    const success = results.filter((r) => {
      if (r.status !== 'fulfilled') console.log(r.reason);
      return (
        r.status === 'fulfilled' &&
        (r.value.status === 200 || r.value.status === 201)
      );
    }).length;

    expect(success).toBe(5);

    const final = await Account.findByPk(1);
    expect(final.balance).toBe(0);
  });
});
