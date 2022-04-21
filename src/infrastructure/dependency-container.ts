import { Container } from 'inversify';
import { TYPES } from '@shared/types';
import { CustomerRepository } from '@domain/repositories/customer-repository';
import { MemoryCustomerRepository } from '@repositories/memory-customer-repository';

const container = new Container();
container.bind<CustomerRepository>(TYPES.CustomerRepository).to(MemoryCustomerRepository);

export { container };
