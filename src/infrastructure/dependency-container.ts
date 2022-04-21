import { Container } from 'inversify';
import { TYPES } from '@shared/types';
import { CustomerRepository } from '@domain/repositories/customer-repository';
import { MemoryCustomerRepository } from '@repositories/memory-customer-repository';
import { MemoryBankAccountRepository } from '@repositories/memory-bank-account-repository';
import { BankAccountRepository } from '@domain/repositories/bank-account-repository';
import { RetrieveBankAccountBalance } from '@application/queries/retrieve-bank-account-balance';
import { CreateBankAccount } from '@application/use-cases/create-bank-account';

const container = new Container();
container
    .bind<CustomerRepository>(TYPES.CustomerRepository)
    .to(MemoryCustomerRepository)
    .inSingletonScope();
container
    .bind<BankAccountRepository>(TYPES.BankAccountRepository)
    .to(MemoryBankAccountRepository)
    .inSingletonScope();
container
    .bind<RetrieveBankAccountBalance>(TYPES.RetrieveBankAccountBalance)
    .to(RetrieveBankAccountBalance);
container.bind<CreateBankAccount>(TYPES.CreateBankAccount).to(CreateBankAccount);
export { container };
