import { BankAccount } from '@domain/entities/bank-account';
import { customerFixture } from './customer.fixture';

export const bankAccountFixture = new BankAccount('625c670438f7f5b8e4396f7a', 100, customerFixture);
