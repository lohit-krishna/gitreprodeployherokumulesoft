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



/*function queryBuilder(operation, tableName, allFields, valuesArray, fieldsArray, condition = '') {
    var query = '';
    if (operation.toLowerCase() === "select") {
        query = ''
        if (allFields === true)
            query = operation + ' * FROM ' + tableName;
        else {
            query = operation + " " + fieldsArray.toString() + ' FROM ' + tableName;

        }
        query = condition === '' ? query : query + ' where ' + condition;


    } else if (operation.toLowerCase() === 'insert') {
        query = ''
        if (allFields === true) {
            query = 'INSERT INTO ' + tableName + ' VALUES ';
        } else {
            var query = 'INSERT INTO ' + tableName + '(' + fieldsArray.toString() + ')' + ' VALUES ';
        }
        for (let i = 0; i < valuesArray.length; i++) {
            query = query + '(';
            for (let j = 0; j < valuesArray[i].length; j++) {

                if (typeof valuesArray[i][j] === "string")
                    query = query + '"' + valuesArray[i][j].toString() + '"';
                else
                    query = query + valuesArray[i][j].toString();

                query = j === valuesArray[i].length - 1 ? query = query : query = query + ",";

            }
            query = i === valuesArray.length - 1 ? query = query + ")" : query = query + "),";

        }


    } else if (operation.toLowerCase() === 'create') {
        query = 'CREATE TABLE ' + tableName + '(' + fieldsArray.toString() + ')'
    }
    query = query + ';';
    return query;
}*/



function contextFunc(response, contextString) {
    if (contextString === 'create table' && response.rows.length == 0)
        return client.query(query);
    else if (contextString === 'insert')
        return pool.query(queryInsert);
}

client.connect();
client.query(checkTableExists)
    .then((response) => {
        return contextFunc(response, 'create table');
    })
    .then((response) => {
        return contextFunc(response, 'insert');
    })
    .then(response => {
        console.log("Data insert successful");
        pool.end();
        client.end();
    })