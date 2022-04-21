import { inject, injectable } from 'inversify';
import { BankAccountRepository } from '@domain/repositories/bank-account-repository';
import { TYPES } from '@shared/types';

@injectable()
export class RetrieveBankAccountBalance {
    constructor(
        @inject(TYPES.BankAccountRepository) private bankAccountRepository: BankAccountRepository,
    ) {}

    async execute(bankAccountId: number): Promise<number> {
        const bankAccount = await this.bankAccountRepository.getById(bankAccountId);
        return bankAccount.balance;
    }
}
