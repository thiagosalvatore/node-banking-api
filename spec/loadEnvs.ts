import dotenv from 'dotenv';

const envVars = dotenv.config({
    path: `./src/settings/env/test.env`,
});

if (envVars.error) {
    throw envVars.error;
}
