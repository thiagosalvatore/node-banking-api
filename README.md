### How to run
This project uses Node + Express + Typescript. Follow the steps below in order to use it:
- run `yarn install` inside the project folder
- run `yarn start:dev` to run the project with live reload enabled. It will be running on port 3000.


### Assumptions and missing items
- It says that I should return Balances for a given account, but the account has only one balance. So I'm returning only that. Should I return the historical balances?
- In a real world the authenticated person would be able to transfer only from his account to another account. Since we don't have authentication at this moment, I'm assuming that you can transfer from any account to any other account using the API.
- In a real world the in memory repositories would be replaced by a database
- Given the timeframe, I didn't implement integration tests for the APIs. I added unit tests for queries and use cases and integration tests for the repositories.
- There are a couple issues reported by ESLint that were not fixed, but it should be easy to fix.


### Project Structure
This projects follows (in parts) the [clean architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) proposed by Uncle Bob.
The main idea is to separate what is belongs to our business from other things (API, persistence, etc). The project is structured as follows:
- **application** - Here we store use cases and queries. Basically it is responsible for performing operations on our domain, like creating an account, fetching balance from accounts, etc.
- **domain** - Here is where our domain is located. We have entities that models our business, we have the interfaces to our repositories, we have errors related to our domain. Note that this layer has no dependency with things other than javascript.
- **infrastructure** - Everything that is not tied to our business is here. Our API and controllers, persistence logic, etc.

### API Documentation

#### Create new bank account

This resource allows you to create a new bank account in our system.
- Method: POST
- URL: http://localhost:3000/api/bank-accounts
- Request Payload
```json
{
  "customerId": 1,
  "depositAmount": 100
}
```
- Success Response Payload (201 - Created)
```json
{
  "balance": 100,
  "customer": {
    "id": 3,
    "name": "Rhonda Church"
  },
  "id": 1
}
```

#### Fetch bank account balance
This resource allows you to fetch the latest balance from a bank account.
- Method: GET
- URL: http://localhost:3000/api/bank-accounts/{bank_account_id}

- Success Response Payload (200 - OK)
```json
{
  "balance": 100,
  "customer": {
    "id": 3,
    "name": "Rhonda Church"
  },
  "id": 1
}
```

#### Transfer amount between accounts
This resource allows you to transfer a certain amount between two different accounts. Note that it checks if you have enough funds to do the transfer. 
- Method: POST
- URL: http://localhost:3000/api/transfers
- Request Payload
```json
{
  "fromBankAccountId": 3,
  "toBankAccountId": 2,
  "amount": 50
}
```

- Success Response Payload (201 - CREATED)
```json
{
  "fromBankAccountId": 3,
  "toBankAccountId": 2,
  "referenceDate": "2022-04-21T23:27:28.096Z",
  "amount": 50,
  "id": 1
}
```

#### Retrieve transfer history for a given account
This resource returns all the transfers that ever happened for a given account. It doesn't matter if the transfer came from this account or if the transfer was to this account, this resource returns both.

- Method: GET
- URL: http://localhost:3000/api/bank-accounts/{bank_account_id}/transfers

- Success Response Payload (200 - OK)
```json
[
  {
    "fromBankAccountId": 3,
    "toBankAccountId": 2,
    "referenceDate": "2022-04-21T23:27:28.096Z",
    "amount": 50,
    "id": 1
  }
]
```