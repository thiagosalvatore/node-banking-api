import { Schema } from 'express-validator/src/middlewares/schema';

export const transferSchema: Schema = {
    fromBankAccountId: {
        errorMessage: 'Invalid bank account id',
        isNumeric: true,
        in: ['body'],
    },
    toBankAccountId: {
        errorMessage: 'Invalid bank account id',
        in: ['body'],
    },
    amount: {
        errorMessage: 'Invalid amount',
        isInt: {
            options: {
                gt: 0,
            },
        },
        in: ['body'],
    },
};
