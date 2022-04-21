import { CustomerRepository } from '@domain/repositories/customer-repository';
import { customerFixture } from './customer.fixture';

let customerRepositoryMock: CustomerRepository = {
    getById: jest.fn(async (id: number) => {
        return customerFixture;
    }),
};

export { customerRepositoryMock };
