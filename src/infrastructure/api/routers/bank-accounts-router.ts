import { Router, Request, Response } from 'express';
import { container } from '../../dependency-container';
import { RetrieveBankAccountBalance } from '@application/queries/retrieve-bank-account-balance';
import { TYPES } from '@shared/types';
import { StatusCodes } from 'http-status-codes';
import { BankAccountNotFound } from '@domain/errors/bank-account-not-found';
import { checkSchema, validationResult } from 'express-validator';
import { newBankAccountSchema } from './schemas/bank-account-schema';
import { CreateBankAccount } from '@application/use-cases/create-bank-account';

const router = Router();

router.post('/', checkSchema(newBankAccountSchema), async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const createBankAccount = container.get<CreateBankAccount>(TYPES.CreateBankAccount);
    const bankAccountData = {
        customerId: req.body.customerId,
        depositAmount: req.body.depositAmount,
    };
    const bankAccount = await createBankAccount.execute(bankAccountData);
    return res.status(StatusCodes.CREATED).json(bankAccount);
});

router.get('/:bankAccountId', async (req: Request, res: Response) => {
    const { bankAccountId } = req.params;

    if (!parseInt(bankAccountId)) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: 'Bank account id needs to be an integer' });
    }

    const retrieveBankAccountBalance = container.get<RetrieveBankAccountBalance>(
        TYPES.RetrieveBankAccountBalance,
    );
    try {
        const balance = await retrieveBankAccountBalance.execute(parseInt(bankAccountId));
        return res.status(StatusCodes.OK).json({ balance: balance });
    } catch (err) {
        if (err instanceof BankAccountNotFound) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: err.message });
        }
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: 'Something went wrong' });
    }
});

export default router;
