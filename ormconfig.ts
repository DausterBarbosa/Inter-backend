require('dotenv/config');

module.exports = {
    "type": process.env.TYPE,
    "host": process.env.HOST,
    "port": process.env.PORT,
    "username": process.env.USERNAME,
    "password": process.env.PASSWORD,
    "database": process.env.DATABASE,
    "synchronize": true,
    "logging": false,
    "entities": [
       "./build/src/database/entity/*.js"
    ],
    "migrations": [
       "src/database/migration/**/*.js"
    ],
    "subscribers": [
       "src/database/subscriber/**/*.js"
    ],
    "cli": {
       "entitiesDir": "src/database/entity",
       "migrationsDir": "src/database/migration",
       "subscribersDir": "src/database/subscriber"
    }
 }