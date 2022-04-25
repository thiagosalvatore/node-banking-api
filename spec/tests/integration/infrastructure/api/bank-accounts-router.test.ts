import supertest from 'supertest';
import StatusCodes from 'http-status-codes';
import { SuperTest, Test, Response } from 'supertest';
import app from '../../../../../src/infrastructure/api/server';
import { container } from '../../../../../src/infrastructure/dependency-container';
import { TYPES } from '@shared/types';
import { BankAccountRepository } from '@domain/repositories/bank-account-repository';
import { bankAccountFixture } from '../../../__fixtures__/bank-account.fixture';
const { setupDB } = require('../../../setupTests');

describe('Infrastructure | API | BankAccountsRouter', () => {
    let agent: SuperTest<Test>;

    setupDB('bank-accounts-test');

    beforeAll((done) => {
        agent = supertest.agent(app);
        done();
    });

    /***********************************************************************************
     *                                    Test Get
     **********************************************************************************/

    describe('Test GET /bank-accounts/{bank-account-id}', () => {
        it('should return 404 when there is no bank account with given id', (done) => {
            agent.get('/api/bank-accounts/1').end((err: Error, res: Response) => {
                expect(res.status).toBe(StatusCodes.NOT_FOUND);
                done();
            });
        });

        it('should return 404 when there is no bank account with given id', (done) => {
            agent.get('/api/bank-accounts/1').end((err: Error, res: Response) => {
                expect(res.status).toBe(StatusCodes.NOT_FOUND);
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

        // it(`should return a JSON object containing an error message and a status code of
        //     "${BAD_REQUEST}" if the request was unsuccessful.`, (done) => {
        //     // Setup spy
        //     const errMsg = 'Could not fetch users.';
        //     spyOn(userRepo, 'getAll').and.throwError(errMsg);
        //     // Call API
        //     agent.get(getUsersPath).end((err: Error, res: Response) => {
        //         pErr(err);
        //         console.log(res.body);
        //         expect(res.status).toBe(BAD_REQUEST);
        //         expect(res.body.error).toBe(errMsg);
        //         done();
        //     });
        // });
    });
});
