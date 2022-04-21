import { Router, Request, Response } from 'express';
import { container } from '../../dependency-container';
import { TYPES } from '@shared/types';
import { StatusCodes } from 'http-status-codes';
import { checkSchema, validationResult } from 'express-validator';
import { transferSchema } from './schemas/transfer-schema';
import { TransferAmount } from '@application/use-cases/transfer-amount';
import { TransferDTO } from '@application/dtos/transfer-dto';
import { BankAccountNotFound } from '@domain/errors/bank-account-not-found';
import { InsufficientFundsError } from '@domain/errors/insufficient-funds';
import { ListTransferHistory } from '@application/queries/list-transfer-history';

const router = Router();

router.get('/:bankAccountId', async (req: Request, res: Response) => {
    const { bankAccountId } = req.params;

    if (!parseInt(bankAccountId)) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: 'Bank account id needs to be an integer' });
    }

    const listTransferHistory = container.get<ListTransferHistory>(TYPES.ListTransferHistory);
    const transfers = listTransferHistory.execute(parseInt(bankAccountId));
    return res.status(StatusCodes.OK).json(transfers);
});

router.post('/', checkSchema(transferSchema), async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const transferAmount = container.get<TransferAmount>(TYPES.TransferAmount);
    const transferData: TransferDTO = {
        fromBankAccountId: req.body.fromBankAccountId,
        toBankAccountId: req.body.toBankAccountId,
        amount: req.body.amount,
    };
    try {
        const transfer = await transferAmount.execute(transferData);
        return res.status(StatusCodes.CREATED).json(transfer);
    } catch (err) {
        if (err instanceof BankAccountNotFound) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: err.message });
        }
        if (err instanceof InsufficientFundsError) {
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ message: err.message });
        }
    }
});

export default router;
