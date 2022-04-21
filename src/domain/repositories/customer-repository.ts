import { Customer } from '@domain/entities/customer';

export interface CustomerRepository {
    getById(id: number): Promise<Customer>;
}
