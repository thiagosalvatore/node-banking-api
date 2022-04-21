const TYPES = {
    CustomerRepository: Symbol.for('CustomerRepository'),
    BankAccountRepository: Symbol.for('BankAccountRepository'),

    RetrieveBankAccountBalance: Symbol.for('RetrieveBankAccountBalance'),
    CreateBankAccount: Symbol.for('CreateBankAccount'),
};

export { TYPES };
