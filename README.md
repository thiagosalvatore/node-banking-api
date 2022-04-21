### Objective

Your assignment is to build an internal API for a fake financial institution using Node and Express.

### Brief

While modern banks have evolved to serve a plethora of functions, at their core, banks must provide certain basic features. Today, your task is to build the basic HTTP API for one of those banks! Imagine you are designing a backend API for bank employees. It could ultimately be consumed by multiple frontends (web, iOS, Android etc).

### Tasks

- Implement assignment using:
  - Language: **Node**
  - Framework: **Express**
- There should be API routes that allow them to:
  - Create a new bank account for a customer, with an initial deposit amount. A
    single customer may have multiple bank accounts.
  - Transfer amounts between any two accounts, including those owned by
    different customers.
  - Retrieve balances for a given account.
  - Retrieve transfer history for a given account.
- Write tests for your business logic

Feel free to pre-populate your customers with the following:

```json
[
  {
    "id": 1,
    "name": "Arisha Barron"
  },
  {
    "id": 2,
    "name": "Branden Gibson"
  },
  {
    "id": 3,
    "name": "Rhonda Church"
  },
  {
    "id": 4,
    "name": "Georgina Hazel"
  }
]
```

You are expected to design any other required models and routes for your API.

### Evaluation Criteria

- **Node** best practices
- Completeness: did you complete the features?
- Correctness: does the functionality act in sensible, thought-out ways?
- Maintainability: is it written in a clean, maintainable way?
- Testing: is the system adequately tested?
- Documentation: is the API well-documented?

### CodeSubmit

Please organize, design, test and document your code as if it were going into production - then push your changes to the master branch. After you have pushed your code, you may submit the assignment on the assignment page.

All the best and happy coding,

The Paysail Team



### Open questions
- It says that I should return Balances for a given account, but the account has only one balance. So I'm returning only that. Should I return the historical balances?
- In a real world the authenticated person would be able to transfer only from his account to another account. Since we don't have authentication at this moment, I'm assuming that you can transfer from any account to any other account using the API.



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