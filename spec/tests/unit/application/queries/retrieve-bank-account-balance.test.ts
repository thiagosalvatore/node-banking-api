import { RetrieveBankAccountBalance } from '@application/queries/retrieve-bank-account-balance';
import { bankAccountRepositoryMock } from '../../../__fixtures__/bank-account-repository.fixture';
import { bankAccountFixture } from '../../../__fixtures__/bank-account.fixture';
import { BankAccountNotFound } from '@domain/errors/bank-account-not-found';

describe('Application | Queries | RetrieveBankAccountBalance', () => {
    it('calls bank account repository getById with given bank account id', async () => {
        const retrieveBankAccountBalance = new RetrieveBankAccountBalance(
            bankAccountRepositoryMock,
        );

        await retrieveBankAccountBalance.execute(bankAccountFixture.id!!);

        expect(bankAccountRepositoryMock.getById).toHaveBeenCalledWith(bankAccountFixture.id);
    });
    describe('when bank account exists', () => {
        it('returns the balance for the given bank account', async () => {
            const retrieveBankAccountBalance = new RetrieveBankAccountBalance(
                bankAccountRepositoryMock,
            );

            const balance = await retrieveBankAccountBalance.execute(bankAccountFixture.id!!);

            expect(balance).toEqual(bankAccountFixture.balance);
        });
    });

    describe('when bank account does not exist', () => {
        it('throws BankAccountNotFound error', async () => {
            const retrieveBankAccountBalance = new RetrieveBankAccountBalance(
                bankAccountRepositoryMock,
            );

            retrieveBankAccountBalance
                .execute(100)
                .catch((e) =>
                    expect(e).toEqual(
                        new BankAccountNotFound(`Bank account with id 100 not found`),
                    ),
                );
        });
    });
});
