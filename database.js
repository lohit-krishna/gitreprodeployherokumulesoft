const pg = require('pg');
const connectionString = process.env.DATABASE_URL;

const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    }
});

const client = new pg.Client(connectionString);

client.connect();
client.query(
    'CREATE TABLE testpostgresdeploy (id text, Name text, \
  title TEXT, description TEXT)',
    (err, res) => {
        if (err) {
            return console.error('error with PostgreSQL database', err);
        } else {
            for (let i = 0; i < 10; i++) {
                pool.query(
                    "INSERT INTO testpostgresdeploy VALUES ('UA502', 'Lohit', 'MR' ,'I am Lohit Krishna')"
                );
            }
        }
        pool.end();
        client.end();
    }
);