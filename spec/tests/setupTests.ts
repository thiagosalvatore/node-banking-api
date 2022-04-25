import 'reflect-metadata';
import { connect } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongoose = require('mongoose');
let mongo: MongoMemoryServer | null = null;

async function removeAllCollections() {
    const collections = Object.keys(mongoose.connection.collections);
    for (const collectionName of collections) {
        const collection = mongoose.connection.collections[collectionName];
        await collection.deleteMany();
    }
}

module.exports = {
    setupDB() {
        // Connect to Mongoose
        beforeAll(async () => {
            mongo = await MongoMemoryServer.create();
            const uri = mongo.getUri();
            await connect(uri);
        });

        // Cleans up database between each test
        afterEach(async () => {
            console.log('removing');
            await removeAllCollections();
        });

        // Disconnect Mongoose
        afterAll(async () => {
            await mongoose.connection.dropDatabase();
            await mongoose.connection.close();
            await mongo?.stop();
        });
    },
};
