import { inject, injectable } from 'inversify';
import { BankAccountRepository } from '@domain/repositories/bank-account-repository';
import { TYPES } from '@shared/types';
import { BankAccountData } from '@application/dtos/bank-account-dto';
import { BankAccount } from '@domain/entities/bank-account';
import { CustomerRepository } from '@domain/repositories/customer-repository';

@injectable()
export class CreateBankAccount {
    constructor(
        @inject(TYPES.BankAccountRepository) private bankAccountRepository: BankAccountRepository,
        @inject(TYPES.CustomerRepository) private customerRepository: CustomerRepository,
    ) {}

    async execute(bankAccountData: BankAccountData): Promise<BankAccount> {
        const customer = await this.customerRepository.getById(bankAccountData.customerId);
        const bankAccount = new BankAccount(bankAccountData.depositAmount || 0, customer);
        return await this.bankAccountRepository.save(bankAccount);
    }
}
