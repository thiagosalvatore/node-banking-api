import { injectable } from 'inversify';
import { BankAccountRepository } from '@domain/repositories/bank-account-repository';
import { BankAccount } from '@domain/entities/bank-account';
import { BankAccountNotFound } from '@domain/errors/bank-account-not-found';

@injectable()
export class MemoryBankAccountRepository implements BankAccountRepository {
    constructor(public bankAccounts: BankAccount[] = []) {}

    private getNextBankAccountId(): number {
        if (this.bankAccounts.length == 0) {
            return 1;
        }
        const latestBankAccount = this.bankAccounts[this.bankAccounts.length - 1];
        return latestBankAccount.id! + 1;
    }

    async getById(id: number): Promise<BankAccount> {
        return new Promise((resolve, reject) => {
            const bankAccount = this.bankAccounts.find((bankAccount) => bankAccount.id === id);

            if (!bankAccount) {
                reject(new BankAccountNotFound(`Bank account with id ${id} not found`));
            }
            resolve(bankAccount!);
        });
    }

    async listByCustomer(customerId: number): Promise<BankAccount[]> {
        return Promise.resolve(
            this.bankAccounts.filter((bankAccount) => bankAccount.customer.id == customerId),
        );
    }

    async save(bankAccount: BankAccount): Promise<BankAccount> {
        // TODO: handle duplicated ids
        bankAccount.id = this.getNextBankAccountId();
        this.bankAccounts.push(bankAccount);
        return Promise.resolve(bankAccount);
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
