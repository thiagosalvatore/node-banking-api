import { BankAccount } from '@domain/entities/bank-account';

export interface BankAccountRepository {
    listByCustomer(customerId: string): Promise<BankAccount[]>;
    getById(id: number): Promise<BankAccount>;
    save(bankAccount: BankAccount): Promise<BankAccount>;
    update(bankAccount: BankAccount): Promise<void>;
}
