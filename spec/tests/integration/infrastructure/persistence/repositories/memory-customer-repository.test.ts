import { MemoryCustomerRepository } from '@repositories/memory-customer-repository';
import { Customer } from '@domain/entities/customer';
import { CustomerNotFound } from '@domain/errors/customer-not-found';

describe('Infrastructure | Persistence | Repositories | MemoryCustomerRepository', () => {
    describe('Test getById', () => {
        describe('when there is a user with desired id', () => {
            it('should return the user', async () => {
                const repository = new MemoryCustomerRepository();
                const expectedCustomer: Customer = {
                    id: '1',
                    name: 'Arisha Barron',
                };

                const customer = await repository.getById('1');

                expect(customer).toEqual(expectedCustomer);
            });
        });

        describe('when there is no user with desired id', () => {
            it('should throw CustomerNotFound error', async () => {
                const repository = new MemoryCustomerRepository();

                repository
                    .getById('321')
                    .catch((e) =>
                        expect(e).toEqual(new CustomerNotFound(`Customer with id 321 not found`)),
                    );
            });
        });
    });
});
