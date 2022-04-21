import { inject, injectable } from 'inversify';
import { BankAccountRepository } from '@domain/repositories/bank-account-repository';
import { TYPES } from '@shared/types';
import { CustomerRepository } from '@domain/repositories/customer-repository';
import { TransferDTO } from '@application/dtos/transfer-dto';

@injectable()
export class TransferAmount {
    constructor(
        @inject(TYPES.BankAccountRepository) private bankAccountRepository: BankAccountRepository,
        @inject(TYPES.CustomerRepository) private customerRepository: CustomerRepository,
    ) {}

    async execute(transferData: TransferDTO): Promise<void> {
        const fromBankAccount = await this.bankAccountRepository.getById(
            transferData.fromBankAccountId,
        );
        const toBankAccount = await this.bankAccountRepository.getById(
            transferData.toBankAccountId,
        );

        fromBankAccount.transferOut(transferData.amount);
        toBankAccount.transferIn(transferData.amount);

        await this.bankAccountRepository.update(fromBankAccount);
        await this.bankAccountRepository.update(toBankAccount);
    }
}
