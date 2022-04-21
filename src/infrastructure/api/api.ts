import { Router } from 'express';

import bankAccountsRouter from './routers/bank-accounts-router';

const baseRouter = Router();

baseRouter.use('/bank-accounts', bankAccountsRouter);

export default baseRouter;
