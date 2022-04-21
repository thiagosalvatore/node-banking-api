import { ListTransferHistory } from '@application/queries/list-transfer-history';
import { transferRepositoryMock } from '../../../__fixtures__/transfer-repository.fixture';
import { transferFixture } from '../../../__fixtures__/transfer.fixture';

describe('Application | Queries | ListTransferHistory', () => {
    it('calls transfer repository listByAccount with given id', async () => {
        const listTransferHistory = new ListTransferHistory(transferRepositoryMock);

        await listTransferHistory.execute(transferFixture.id!!);

        expect(transferRepositoryMock.listByAccount).toHaveBeenCalledWith(transferFixture.id);
    });
    it('returns the list of transfers for the given account', async () => {
        const listTransferHistory = new ListTransferHistory(transferRepositoryMock);
        const expectedTransfers = [transferFixture];

        const transfers = await listTransferHistory.execute(transferFixture.fromBankAccountId);

        expect(transfers).toEqual(expectedTransfers);
    });
});
