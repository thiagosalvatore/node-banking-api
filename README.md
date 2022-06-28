### Deploying to production
This project assumes that you are using Docker or any other docker-based tool like AWS ECS, Fargate or Kubernetes.
In order to build the image to production, use the steps below:
- You will need to have mongodb running. If you are using the local image, you need to run `docker-compose up mongo`.
- run `docker build -t banking --target production .` from the root folder of the project
- run `docker run -e MONGO_DB_HOST=host.docker.internal -e MONGO_DB_USERNAME=username -e MONGO_DB_PASSWORD=password -e MONGO_DB_DATABASE=banking -p 3000:3000 banking yarn start`
- Please note that we are sending secrets in the command. In production we would never do that, we would inject those secrets as env vars using some vault like `AWS Parameter Store`

### How to run (development)
This project uses Node + Express + Typescript. Follow the steps below in order to use it:
- run `docker-compose up` in the root folder of the project
- the project will be running with live reload enabled and it will be exposed on port 3000.
- If you don't want to use docker, you can simply start the mongo container by running `docker-compose up mongo` and then run `yarn start:dev` from your local folder.

### Running tests
The tests are using an in-memory MongoDB, so you don't need to run any container or mongo in order to run the tests locally. All you need to do is `yarn test`.


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