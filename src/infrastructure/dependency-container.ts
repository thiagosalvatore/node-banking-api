import { Container } from 'inversify';
import { TYPES } from '@shared/types';
import { CustomerRepository } from '@domain/repositories/customer-repository';
import { MemoryCustomerRepository } from '@repositories/memory-customer-repository';
import { MemoryBankAccountRepository } from '@repositories/memory-bank-account-repository';
import { BankAccountRepository } from '@domain/repositories/bank-account-repository';
import { RetrieveBankAccountBalance } from '@application/queries/retrieve-bank-account-balance';

const container = new Container();
container.bind<CustomerRepository>(TYPES.CustomerRepository).to(MemoryCustomerRepository);
container.bind<BankAccountRepository>(TYPES.BankAccountRepository).to(MemoryBankAccountRepository);
container
    .bind<RetrieveBankAccountBalance>(TYPES.RetrieveBankAccountBalance)
    .to(RetrieveBankAccountBalance);
export { container };
