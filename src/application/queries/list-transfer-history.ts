import { inject, injectable } from 'inversify';
import { TYPES } from '@shared/types';
import { TransferRepository } from '@domain/repositories/transfer-repository';
import { Transfer } from '@domain/entities/transfer';

@injectable()
export class ListTransferHistory {
    constructor(@inject(TYPES.TransferRepository) private transferRepository: TransferRepository) {}

    async execute(bankAccountId: number): Promise<Transfer[]> {
        return await this.transferRepository.listByAccount(bankAccountId);
    }
}
