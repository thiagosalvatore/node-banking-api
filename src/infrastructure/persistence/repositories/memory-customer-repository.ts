import { injectable } from 'inversify';
import { CustomerRepository } from '@domain/repositories/customer-repository';
import { Customer } from '@domain/entities/customer';
import { CustomerNotFound } from '@domain/errors/customer-not-found';

const customers: Customer[] = [
    {
        id: 1,
        name: 'Arisha Barron',
    },
    {
        id: 2,
        name: 'Branden Gibson',
    },
    {
        id: 3,
        name: 'Rhonda Church',
    },
    {
        id: 4,
        name: 'Georgina Hazel',
    },
];

@injectable()
export class MemoryCustomerRepository implements CustomerRepository {
    async getById(id: number): Promise<Customer> {
        return new Promise((resolve, reject) => {
            const customer = customers.find((customer) => customer.id === id);

            if (!customer) {
                reject(new CustomerNotFound(`Customer with id ${id} not found`));
            }
            resolve(customer!);
        });
    }
}
