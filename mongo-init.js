db.createUser({
    user: 'username',
    pwd: 'password',
    roles: [
        {
            role: 'readWrite',
            db: 'banking',
        },
        {
            role: 'readWrite',
            db: 'banking-test',
        },
    ],
});

testDb = db.getSiblingDB('banking-test');

testDb.createUser({
    user: 'username',
    pwd: 'password',
    roles: [
        {
            role: 'readWrite',
            db: 'banking',
        },
        {
            role: 'readWrite',
            db: 'banking-test',
        },
    ],
});

db.createCollection('customers');

db.customers.insertMany([
    {
        name: 'Arisha Barron',
    },
    {
        name: 'Branden Gibson',
    },
    {
        name: 'Rhonda Church',
    },
    {
        name: 'Georgina Hazel',
    },
]);
