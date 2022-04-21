import { Router } from 'express';

import bankAccountsRouter from './routers/bank-accounts-router';
import transfersRouter from './routers/transfers-router';

const baseRouter = Router();

baseRouter.use('/bank-accounts', bankAccountsRouter);
baseRouter.use('/transfers', transfersRouter);

export default baseRouter;
