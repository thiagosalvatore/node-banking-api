import { BankAccountRepository } from '@domain/repositories/bank-account-repository';
import { bankAccountFixture } from './bank-account.fixture';
import { BankAccount } from '@domain/entities/bank-account';

let bankAccountRepositoryMock: BankAccountRepository = {
    listByCustomer: jest.fn(async (customerId: number) => {
        return [bankAccountFixture];
    }),
    getById: jest.fn(async (id: number) => {
        return bankAccountFixture;
    }),
    save: jest.fn(async (bankAccount: BankAccount) => {
        bankAccount.id = 1;
        return bankAccount;
    }),
    update: jest.fn(async (bankAccount: BankAccount) => {
        return;
    }),
};

export { bankAccountRepositoryMock };
