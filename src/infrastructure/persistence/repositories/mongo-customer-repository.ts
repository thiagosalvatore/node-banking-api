import { injectable } from 'inversify';
import { CustomerRepository } from '@domain/repositories/customer-repository';
import { Customer } from '@domain/entities/customer';
import { CustomerNotFound } from '@domain/errors/customer-not-found';
import { CustomerModel, ICustomer } from '../models/customer.model';

@injectable()
export class MongoCustomerRepository implements CustomerRepository {
    private static mapFromModelToEntity(model: ICustomer): Customer {
        return {
            name: model.name,
            id: model.id.toString(),
        };
    }

    async getById(id: string): Promise<Customer> {
        const customerDocument = await CustomerModel.findById(id).exec();

        if (!customerDocument) {
            throw new CustomerNotFound(`Customer with id ${id} not found`);
        }

        return MongoCustomerRepository.mapFromModelToEntity(customerDocument);
    }
}
