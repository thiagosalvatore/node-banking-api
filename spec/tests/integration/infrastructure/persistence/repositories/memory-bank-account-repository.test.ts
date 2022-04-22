import { MemoryBankAccountRepository } from '@repositories/memory-bank-account-repository';
import { bankAccountFixture } from '../../../../__fixtures__/bank-account.fixture';
import { BankAccountNotFound } from '@domain/errors/bank-account-not-found';
import { BankAccount } from '@domain/entities/bank-account';
import { customerFixture } from '../../../../__fixtures__/customer.fixture';

describe('Infrastructure | Persistence | Repositories | MemoryBankAccountRepository', () => {
    describe('Test getById', () => {
        describe('when there is a bank account with desired id', () => {
            it('returns the bank account', async () => {
                const repository = new MemoryBankAccountRepository([bankAccountFixture]);
                const expectedBankAccount = bankAccountFixture;

                const bankAccount = await repository.getById(bankAccountFixture.id!);

                expect(bankAccount).toEqual(expectedBankAccount);
            });
        });

        describe('when there is no bank account with desired id', () => {
            it('throws BankAccountNotFound error', async () => {
                const repository = new MemoryBankAccountRepository();

                repository
                    .getById(100)
                    .catch((e) =>
                        expect(e).toEqual(
                            new BankAccountNotFound(`Bank account with id 100 not found`),
                        ),
                    );
            });
        });
    });

    describe('Test listByCustomer', () => {
        describe('when called with customer with single bank accounts', () => {
            it('returns a list with a single bank account on it', async () => {
                const repository = new MemoryBankAccountRepository([bankAccountFixture]);
                const expectedBankAccounts = [bankAccountFixture];

                const bankAccounts = await repository.listByCustomer(
                    bankAccountFixture.customer.id,
                );

                expect(bankAccounts).toEqual(expectedBankAccounts);
            });
        });

        describe('when called with customer without bank accounts', () => {
            it('returns an empty list', async () => {
                const repository = new MemoryBankAccountRepository([bankAccountFixture]);
                const expectedBankAccounts: BankAccount[] = [];

                const bankAccounts = await repository.listByCustomer(200);

                expect(bankAccounts).toEqual(expectedBankAccounts);
            });
        });
    });

    describe('Test save', () => {
        it('adds the new bank account to the list of bank accounts', async () => {
            const repository = new MemoryBankAccountRepository([]);
            const expectedBankAccounts: BankAccount[] = [bankAccountFixture];

            await repository.save(bankAccountFixture);

            expect(repository.bankAccounts).toEqual(expectedBankAccounts);
        });

        it('returns the newly created bank account with id equals 2', async () => {
            const repository = new MemoryBankAccountRepository([
                new BankAccount(100, customerFixture, 1),
            ]);
            const expectedBankAccount = new BankAccount(200, customerFixture);

            const bankAccount = await repository.save(bankAccountFixture);

            expect(bankAccount.id).toEqual(2);
        });
    });

    describe('Test update', () => {
        describe('when called with invalid bank account id', () => {
            it('throws BankAccountNotFound error', async () => {
                const repository = new MemoryBankAccountRepository();

                repository
                    .update(new BankAccount(100, customerFixture, 2))
                    .catch((e) =>
                        expect(e).toEqual(
                            new BankAccountNotFound(`Bank account with id 2 not found`),
                        ),
                    );
            });
        });

        describe('when called with existing bank account', () => {
            it('Updates the bank account on the database', async () => {
                const repository = new MemoryBankAccountRepository([bankAccountFixture]);
                const updatedBankAccount = new BankAccount(
                    500,
                    bankAccountFixture.customer,
                    bankAccountFixture.id,
                );

                await repository.update(updatedBankAccount);

                const bankAccount = repository.bankAccounts.find(
                    (bankAccount) => bankAccount.id == updatedBankAccount.id,
                );
                expect(bankAccount).toEqual(updatedBankAccount);
            });
        });
    });
});
