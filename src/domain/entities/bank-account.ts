import { Customer } from '@domain/entities/customer';
import { InsufficientFundsError } from '@domain/errors/insufficient-funds';

export class BankAccount {
    constructor(public balance: number, public customer: Customer, public id?: number) {}

    transferIn(amount: number) {
        this.balance += amount;
    }

    transferOut(amount: number) {
        if (this.balance < amount) {
            throw new InsufficientFundsError(
                `Account ${this.id} has not enough funds to complete this transfer`,
            );
        }
        this.balance -= amount;
    }
}
