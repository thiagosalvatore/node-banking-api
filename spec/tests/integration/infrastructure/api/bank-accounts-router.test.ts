import supertest from 'supertest';
import StatusCodes from 'http-status-codes';
import { SuperTest, Test, Response } from 'supertest';
import app from '../../../../../src/infrastructure/api/server';
import { container } from '../../../../../src/infrastructure/dependency-container';
import { TYPES } from '@shared/types';
import { BankAccountRepository } from '@domain/repositories/bank-account-repository';
import { bankAccountFixture } from '../../../__fixtures__/bank-account.fixture';
import { CustomerModel } from '../../../../../src/infrastructure/persistence/models/customer.model';
import { customerFixture } from '../../../__fixtures__/customer.fixture';
import { TransferRepository } from '@domain/repositories/transfer-repository';
import { Transfer } from '@domain/entities/transfer';
const { setupDB } = require('../../../setupTests');

describe('Infrastructure | API | BankAccountsRouter', () => {
    let agent: SuperTest<Test>;

    setupDB();

    beforeAll((done) => {
        agent = supertest.agent(app);
        jest.resetAllMocks();
        done();
    });

    /***********************************************************************************
     *                                    Test Get bank account
     **********************************************************************************/

    describe('Test GET /bank-accounts/{bank-account-id}', () => {
        it('should return 400 when the id in the URL is not an integer', (done) => {
            const expectedResponse = { message: 'Bank account id needs to be an integer' };

            agent.get('/api/bank-accounts/a').end((err: Error, res: Response) => {
                expect(res.status).toBe(StatusCodes.BAD_REQUEST);
                expect(res.body).toStrictEqual(expectedResponse);
                done();
            });
        });

        it('should return 404 when there is no bank account with given id', (done) => {
            const expectedResponse = { message: `Bank account with id 1 not found` };

            agent.get('/api/bank-accounts/1').end((err: Error, res: Response) => {
                expect(res.status).toBe(StatusCodes.NOT_FOUND);
                expect(res.body).toStrictEqual(expectedResponse);
                done();
            });
        });

        it(`should return 200 when there is a bank account with given id`, async () => {
            const bankAccountRepository = container.get<BankAccountRepository>(
                TYPES.BankAccountRepository,
            );
            await bankAccountRepository.save(bankAccountFixture);

            const response = await agent.get(`/api/bank-accounts/${bankAccountFixture.id}`);

            expect(response.status).toBe(StatusCodes.OK);
        });

        it(`should return account balance when there is a bank account with given id`, async () => {
            const bankAccountRepository = container.get<BankAccountRepository>(
                TYPES.BankAccountRepository,
            );
            await bankAccountRepository.save(bankAccountFixture);
            const expectedResponse = { balance: bankAccountFixture.balance };

            const response = await agent.get(`/api/bank-accounts/${bankAccountFixture.id}`);

            expect(response.body).toStrictEqual(expectedResponse);
        });
    });

    /***********************************************************************************
     *                                    Test POST bank accounts
     **********************************************************************************/

    describe('Test POST /bank-accounts', () => {
        it('should return 400 bad request when invalid customer id is sent', (done) => {
            const payload = {
                customerId: '6263f7bbe2de19eaed0e13f7',
                depositAmount: 200,
            };
            const expectedResponse = {
                message: `Customer with id ${payload.customerId} not found`,
            };

            agent
                .post('/api/bank-accounts')
                .send(payload)
                .end((err: Error, res: Response) => {
                    expect(res.status).toBe(StatusCodes.BAD_REQUEST);
                    expect(res.body).toStrictEqual(expectedResponse);
                    done();
                });
        });

        it('should return 400 bad request when invalid payload is sent', (done) => {
            const payload = {};
            const expectedResponse = {
                errors: [
                    {
                        location: 'body',
                        msg: 'Invalid customer id',
                        param: 'customerId',
                    },
                ],
            };

            agent
                .post('/api/bank-accounts')
                .send(payload)
                .end((err: Error, res: Response) => {
                    expect(res.status).toBe(StatusCodes.BAD_REQUEST);
                    expect(res.body).toStrictEqual(expectedResponse);
                    done();
                });
        });

        it('should return 201 created when a valid payload is sent', async () => {
            const customer = await new CustomerModel({
                ...customerFixture,
                id: '6267db50c0b8d967a666042e',
            }).save();
            const payload = {
                customerId: customer.id,
                depositAmount: 200,
            };

            const res = await agent.post('/api/bank-accounts').send(payload);

            const expectedResponse = {
                id: res.body.id,
                balance: payload.depositAmount,
                customer: {
                    name: customer.name,
                    id: customer.id,
                },
            };
            expect(res.status).toBe(StatusCodes.CREATED);
            expect(res.body).toStrictEqual(expectedResponse);
        });
    });

    /***********************************************************************************
     *                                    Test Get Transfers
     **********************************************************************************/

    describe('Test GET /bank-accounts/{bank-account-id}/transfers', () => {
        it('should return 400 when the id in the URL is not an integer', (done) => {
            const expectedResponse = { message: 'Bank account id needs to be an integer' };

            agent.get('/api/bank-accounts/a/transfers').end((err: Error, res: Response) => {
                expect(res.status).toBe(StatusCodes.BAD_REQUEST);
                expect(res.body).toStrictEqual(expectedResponse);
                done();
            });
        });

        it('should return an empty list when there are no transfers', (done) => {
            const expectedResponse: any[] = [];

            agent.get('/api/bank-accounts/1/transfers').end((err: Error, res: Response) => {
                expect(res.status).toBe(StatusCodes.OK);
                expect(res.body).toStrictEqual(expectedResponse);
                done();
            });
        });

        it('should return the list of transfers from and to the given account', async () => {
            const transferRepository = container.get<TransferRepository>(TYPES.TransferRepository);
            const transferFromGivenAccount: Transfer = {
                fromBankAccountId: 1,
                toBankAccountId: 2,
                amount: 100,
                referenceDate: new Date(),
                id: 1,
            };
            const transferToGivenAccount: Transfer = {
                fromBankAccountId: 2,
                toBankAccountId: 1,
                amount: 100,
                referenceDate: new Date(),
                id: 1,
            };
            const randomTransfer: Transfer = {
                fromBankAccountId: 2,
                toBankAccountId: 20,
                amount: 100,
                referenceDate: new Date(),
                id: 1,
            };
            await transferRepository.save(transferFromGivenAccount);
            await transferRepository.save(transferToGivenAccount);
            await transferRepository.save(randomTransfer);
            const expectedResponse = [
                {
                    ...transferFromGivenAccount,
                    referenceDate: transferToGivenAccount.referenceDate.toISOString(),
                },
                {
                    ...transferToGivenAccount,
                    referenceDate: transferToGivenAccount.referenceDate.toISOString(),
                },
            ];

            const res = await agent.get('/api/bank-accounts/1/transfers');

            expect(res.status).toBe(StatusCodes.OK);
            expect(res.body).toStrictEqual(expectedResponse);
        });
    });
});
