require('dotenv/config');

module.exports = {
    "type": process.env.DB_TYPE,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "synchronize": true,
    "logging": false,
    "entities": [
       process.env.ENV === "PRODUCTION"
       ? "build/database/entity/**/*{.ts,.js}"
       : "src/database/entity/**/*{.ts,.js}"
    ],
    "migrations": [
       "src/database/migration/**/*{.ts,.js}"
    ],
    "subscribers": [
       "src/database/subscriber/**/*{.ts,.js}"
    ],
    "cli": {
       "entitiesDir": "src/database/entity",
       "migrationsDir": "src/database/migration",
       "subscribersDir": "src/database/subscriber"
    }
 }