import { BankAccount } from '@domain/entities/bank-account';
import { customerFixture } from './customer.fixture';

export const bankAccountFixture = new BankAccount(1, 100, customerFixture);
