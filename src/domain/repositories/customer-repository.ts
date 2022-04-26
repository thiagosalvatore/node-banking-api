import { Customer } from '@domain/entities/customer';

export interface CustomerRepository {
    getById(id: string): Promise<Customer>;
}
