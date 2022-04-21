export interface Transfer {
    fromBankAccountId: number;
    toBankAccountId: number;
    amount: number;
    id?: number;
}
