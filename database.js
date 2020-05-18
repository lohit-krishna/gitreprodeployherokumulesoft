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

const checkTableExists = `SELECT
*
FROM
pg_catalog.pg_tables where tablename = 'products'`;


const query = `
				CREATE TABLE products (
						id int,
						name varchar,
						quantity int,
						price int
				);
`;

const queryInsert = `
INSERT INTO products (id, name, quantity, price)
VALUES (1, 'Paper Bags', 10, 150);
INSERT INTO products (id, name, quantity, price)
VALUES (2, 'Air Filter', 100, 169);
INSERT INTO products (id, name, quantity, price)
VALUES (3, 'Exhaust Fan', 10, 1000);
INSERT INTO products (id, name, quantity, price)
VALUES (4, 'on Site Technician', 100, 169);
INSERT INTO products (id, name, quantity, price)
VALUES (5, 'Motor 1', 10, 50);
INSERT INTO products (id, name, quantity, price)
VALUES (6, 'Suite', 10, 269);`;

/*pool
    .query(checkTableExists)
    .then((res) => {
        if (res.rows.length == 0) {
            pool.query(query).then((res) => {
                console.log("Table is successfully created");
                pool.query(queryInsert).then((res) => {
                    console.log("Data insert successful");
                });
            });
        } else {
            console.log("Table already Exists!!!");
        }
    })
    .catch((err) => {
        console.error(err);
    })
    .finally(() => {
        //pool.end();
    });*/

client.connect();
client.query(checkTableExists)
    .then((response) => {
        if (res.rows.length == 0) {
            client.query(
                query,
                (err, res) => {
                    if (err) {
                        return console.error('error with PostgreSQL database', err);
                    } else {
                        /*for (let i = 0; i < 10; i++) {
                            pool.query(
                                "INSERT INTO testpostgresdeploy VALUES ('UA502', 'Lohit', 'MR' ,'I am Lohit Krishna')"
                            );
                        }*/
                        pool.query(queryInsert).then((res) => {
                            console.log("Data insert successful");
                        });
                    }
                    pool.end();
                    client.end();
                }
            );

        }

    });