import { Transfer } from '@domain/entities/transfer';

export const transferFixture: Transfer = {
    fromBankAccountId: 1,
    toBankAccountId: 2,
    amount: 100,
    referenceDate: new Date(),
    id: 1,
};
