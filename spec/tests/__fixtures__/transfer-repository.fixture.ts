import { TransferRepository } from '@domain/repositories/transfer-repository';
import { transferFixture } from './transfer.fixture';
import { Transfer } from '@domain/entities/transfer';

const transferRepositoryMock: TransferRepository = {
    listByAccount: jest.fn(async (accountId: number) => {
        return [transferFixture];
    }),
    save: jest.fn(async (transfer: Transfer) => {
        transfer.id = 1;
        return transfer;
    }),
};

export { transferRepositoryMock };
