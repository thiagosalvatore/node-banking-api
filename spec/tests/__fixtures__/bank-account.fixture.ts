import { BankAccount } from '@domain/entities/bank-account';
import { customerFixture } from './customer.fixture';

export const bankAccountFixture = new BankAccount(100, customerFixture, 1);
