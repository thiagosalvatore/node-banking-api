import { injectable } from 'inversify';
import { TransferRepository } from '@domain/repositories/transfer-repository';
import { Transfer } from '@domain/entities/transfer';

@injectable()
export class MemoryTransferRepository implements TransferRepository {
    constructor(public transfers: Transfer[] = []) {}

    private getNextTransferId(): number {
        if (this.transfers.length == 0) {
            return 1;
        }
        const latestTransfer = this.transfers[this.transfers.length - 1];
        return latestTransfer.id! + 1;
    }

    listByAccount(accountId: number): Promise<Transfer[]> {
        return Promise.resolve(
            this.transfers.filter(
                (transfer) =>
                    transfer.toBankAccountId === accountId ||
                    transfer.fromBankAccountId === accountId,
            ),
        );
    }

    save(transfer: Transfer): Promise<Transfer> {
        // TODO: handle duplicated ids
        transfer.id = this.getNextTransferId();
        this.transfers.push(transfer);
        return Promise.resolve(transfer);
    }
}
