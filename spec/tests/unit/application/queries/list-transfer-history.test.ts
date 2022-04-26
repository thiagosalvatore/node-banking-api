import { ListTransferHistory } from '@application/queries/list-transfer-history';
import { transferRepositoryMock } from '../../../__fixtures__/transfer-repository.fixture';
import { transferFixture } from '../../../__fixtures__/transfer.fixture';

describe('Application | Queries | ListTransferHistory', () => {
    it('calls transfer repository listByAccount with given id', async () => {
        const transferMock = transferRepositoryMock();
        const listTransferHistory = new ListTransferHistory(transferMock);

        await listTransferHistory.execute(transferFixture.id!);

        expect(transferMock.listByAccount).toHaveBeenCalledWith(transferFixture.id);
    });
    it('returns the list of transfers for the given account', async () => {
        const transferMock = transferRepositoryMock();
        const listTransferHistory = new ListTransferHistory(transferMock);
        const expectedTransfers = [transferFixture];

        const transfers = await listTransferHistory.execute(transferFixture.fromBankAccountId);

        expect(transfers).toEqual(expectedTransfers);
    });
});
