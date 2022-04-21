import { Transfer } from '@domain/entities/transfer';

export interface TransferRepository {
    save(transfer: Transfer): Promise<Transfer>;
    listByAccount(accountId: number): Promise<Transfer[]>;
}
