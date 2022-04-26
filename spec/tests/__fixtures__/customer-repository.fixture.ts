import { CustomerRepository } from '@domain/repositories/customer-repository';
import { customerFixture } from './customer.fixture';

const customerRepositoryMock: CustomerRepository = {
    getById: jest.fn(async (id: string) => {
        return customerFixture;
    }),
};

export { customerRepositoryMock };
