import { BankAccount } from '@domain/entities/bank-account';

export interface Transfer {
    fromBankAccount: BankAccount;
    toBankAccount: BankAccount;
    amount: number;
}
