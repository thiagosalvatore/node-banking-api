import { MemoryCustomerRepository } from '@repositories/memory-customer-repository';
import { Customer } from '@domain/entities/customer';
import { CustomerNotFound } from '@domain/errors/customer-not-found';
import { MemoryTransferRepository } from '@repositories/memory-transfer-repository';
import { transferFixture } from '../../../../__fixtures__/transfer.fixture';
import { Transfer } from '@domain/entities/transfer';
import { MemoryBankAccountRepository } from '@repositories/memory-bank-account-repository';
import { BankAccount } from '@domain/entities/bank-account';
import { bankAccountFixture } from '../../../../__fixtures__/bank-account.fixture';
import { customerFixture } from '../../../../__fixtures__/customer.fixture';

describe('Infrastructure | Persistence | Repositories | MemoryTransferRepository', () => {
    describe('Test listByAccount', () => {
        describe('when there is a transfer from this bank account', () => {
            it('returns a list with this transfer', async () => {
                const transfer: Transfer = {
                    fromBankAccountId: 100,
                    toBankAccountId: 200,
                    amount: 500,
                    referenceDate: new Date(),
                    id: 5,
                };
                const repository = new MemoryTransferRepository([transferFixture, transfer]);
                const expectedTransfers = [transfer];

                const transfers = await repository.listByAccount(transfer.fromBankAccountId);

                expect(transfers).toEqual(expectedTransfers);
            });
        });

        describe('when there is a transfer to this bank account', () => {
            it('returns a list with this transfer', async () => {
                const transfer: Transfer = {
                    fromBankAccountId: 100,
                    toBankAccountId: 200,
                    amount: 500,
                    referenceDate: new Date(),
                    id: 5,
                };
                const repository = new MemoryTransferRepository([transferFixture, transfer]);
                const expectedTransfers = [transfer];

                const transfers = await repository.listByAccount(transfer.toBankAccountId);

                expect(transfers).toEqual(expectedTransfers);
            });
        });

        describe('when there are no transfers for a given account id', () => {
            it('returns an empty list of transfers', async () => {
                const repository = new MemoryTransferRepository([transferFixture]);
                const expectedTransfers: Transfer[] = [];

                const transfers = await repository.listByAccount(1000);

                expect(transfers).toEqual(expectedTransfers);
            });
        });

        describe('Test save', () => {
            it('adds the new transfer to the list of transfers', async () => {
                const repository = new MemoryTransferRepository([]);
                const expectedTransfers: Transfer[] = [transferFixture];

                await repository.save(transferFixture);

                expect(repository.transfers).toEqual(expectedTransfers);
            });

            it('returns the newly created transfer with id equals 2', async () => {
                const repository = new MemoryTransferRepository([
                    {
                        fromBankAccountId: 100,
                        toBankAccountId: 200,
                        amount: 100,
                        referenceDate: new Date(),
                        id: 1,
                    },
                ]);

                const transfer = await repository.save(transferFixture);

                expect(transfer.id).toEqual(2);
            });
        });
    });
});
