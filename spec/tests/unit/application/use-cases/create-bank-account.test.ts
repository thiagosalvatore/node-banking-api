import { bankAccountRepositoryMock } from '../../../__fixtures__/bank-account-repository.fixture';
import { CreateBankAccount } from '@application/use-cases/create-bank-account';
import { customerRepositoryMock } from '../../../__fixtures__/customer-repository.fixture';
import { BankAccountData } from '@application/dtos/bank-account-dto';
import { customerFixture } from '../../../__fixtures__/customer.fixture';
import { CustomerNotFound } from '@domain/errors/customer-not-found';
import { BankAccount } from '@domain/entities/bank-account';

describe('Application | UseCases | CreateBankAccount', () => {
    beforeEach(() => {
        customerRepositoryMock.getById = jest.fn(async (id: string) => {
            return customerFixture;
        });
        bankAccountRepositoryMock.save = jest.fn(async (bankAccount: BankAccount) => {
            bankAccount.id = 1;
            return bankAccount;
        });
    });
    it('calls customerRepository getById with customerId', async () => {
        const bankAccountData: BankAccountData = {
            customerId: customerFixture.id,
            depositAmount: 100,
        };
        const createBankAccount = new CreateBankAccount(
            bankAccountRepositoryMock,
            customerRepositoryMock,
        );

        await createBankAccount.execute(bankAccountData);

        expect(customerRepositoryMock.getById).toHaveBeenCalledWith(bankAccountData.customerId);
    });
    describe('when customer does not exist', () => {
        it('throws CustomerNotFound error', async () => {
            customerRepositoryMock.getById = jest
                .fn()
                .mockRejectedValueOnce(new CustomerNotFound(`Customer with id 200 not found`));
            const bankAccountData: BankAccountData = {
                customerId: '200',
                depositAmount: 100,
            };
            const createBankAccount = new CreateBankAccount(
                bankAccountRepositoryMock,
                customerRepositoryMock,
            );

            createBankAccount
                .execute(bankAccountData)
                .catch((e) =>
                    expect(e).toEqual(new CustomerNotFound(`Customer with id 200 not found`)),
                );
        });
    });

    describe('when customer exists', () => {
        it('calls bankAccountRepository save with new BankAccount', async () => {
            const bankAccountData = {
                customerId: customerFixture.id,
                depositAmount: 100,
            };
            bankAccountRepositoryMock.save = jest.fn();
            const createBankAccount = new CreateBankAccount(
                bankAccountRepositoryMock,
                customerRepositoryMock,
            );
            const expectedBankAccount = new BankAccount(
                bankAccountData.depositAmount,
                customerFixture,
            );

            await createBankAccount.execute(bankAccountData);

            expect(bankAccountRepositoryMock.save).toHaveBeenCalledWith(expectedBankAccount);
        });

        it('returns the newly created user', async () => {
            const bankAccountData = {
                customerId: customerFixture.id,
                depositAmount: 100,
            };
            const createBankAccount = new CreateBankAccount(
                bankAccountRepositoryMock,
                customerRepositoryMock,
            );
            const expectedBankAccount = new BankAccount(
                bankAccountData.depositAmount,
                customerFixture,
                1,
            );

            const bankAccount = await createBankAccount.execute(bankAccountData);

            expect(bankAccount).toEqual(expectedBankAccount);
        });
    });
});
