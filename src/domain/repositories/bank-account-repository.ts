import { BankAccount } from '@domain/entities/bank-account';

export interface BankAccountRepository {
    listByCustomer(customerId: number): Promise<BankAccount[]>;
    getById(id: number): Promise<BankAccount>;
    save(bankAccount: BankAccount): Promise<void>;
    update(bankAccount: BankAccount): Promise<void>;
}
