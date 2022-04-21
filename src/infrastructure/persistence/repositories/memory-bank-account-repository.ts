import { injectable } from 'inversify';
import { BankAccountRepository } from '@domain/repositories/bank-account-repository';
import { BankAccount } from '@domain/entities/bank-account';
import { BankAccountNotFound } from '@domain/errors/bank-account-not-found';

@injectable()
export class MemoryBankAccountRepository implements BankAccountRepository {
    constructor(public bankAccounts: BankAccount[] = []) {}

    async getById(id: number): Promise<BankAccount> {
        return new Promise((resolve, reject) => {
            const bankAccount = this.bankAccounts.find((bankAccount) => bankAccount.id === id);

            if (!bankAccount) {
                reject(new BankAccountNotFound(`Bank account with id ${id} not found`));
            }
            resolve(bankAccount!!);
        });
    }

    async listByCustomer(customerId: number): Promise<BankAccount[]> {
        return Promise.resolve(
            this.bankAccounts.filter((bankAccount) => bankAccount.customer.id == customerId),
        );
    }

    async save(bankAccount: BankAccount): Promise<void> {
        // TODO: handle duplicated ids
        this.bankAccounts.push(bankAccount);
        return Promise.resolve();
    }

    async update(bankAccount: BankAccount): Promise<void> {
        return new Promise((resolve, reject) => {
            const index = this.bankAccounts.findIndex(
                (bankAccount) => bankAccount.id == bankAccount.id,
            );
            if (index === -1) {
                reject(new BankAccountNotFound(`Bank account with id ${bankAccount.id} not found`));
            }
            this.bankAccounts[index] = bankAccount;
            resolve();
        });
    }
}
