const TYPES = {
    CustomerRepository: Symbol.for('CustomerRepository'),
    BankAccountRepository: Symbol.for('BankAccountRepository'),
    TransferRepository: Symbol.for('TransferRepository'),

    RetrieveBankAccountBalance: Symbol.for('RetrieveBankAccountBalance'),
    CreateBankAccount: Symbol.for('CreateBankAccount'),
    TransferAmount: Symbol.for('TransferAmount'),
    ListTransferHistory: Symbol.for('ListTransferHistory'),
};

export { TYPES };
