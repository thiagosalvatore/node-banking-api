db.createUser({
    user: 'paysail',
    pwd: 'paysailpw',
    roles: [
        {
            role: 'readWrite',
            db: 'paysail',
        },
        {
            role: 'readWrite',
            db: 'paysail-test',
        },
    ],
});

testDb = db.getSiblingDB('paysail-test');

testDb.createUser({
    user: 'paysail',
    pwd: 'paysailpw',
    roles: [
        {
            role: 'readWrite',
            db: 'paysail',
        },
        {
            role: 'readWrite',
            db: 'paysail-test',
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
