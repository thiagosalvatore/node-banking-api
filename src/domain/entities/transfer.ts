export interface Transfer {
    fromBankAccountId: number;
    toBankAccountId: number;
    amount: number;
    referenceDate: Date;
    id?: number;
}
