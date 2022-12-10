let express = require('express');
let listRouter = express.Router();

// import pg
const pg = require('pg');
// create Pool
const Pool = pg.Pool;

// DB connection
const pool = new Pool({
    database: 'weekend-to-do-app',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000,
});

pool.on('connect', () => {
    console.log('postgres is connected');
});

pool.on('error', (error) => {
    console.log('error in connecting to database:', error);
});

// GET request from database
listRouter.get('/', (req, res) => {
    // run query
    let queryText = 'SELECT * FROM "allTasks";';
    // process query
    pool.query(queryText)
    .then((result) => {
        console.log('results from DB', result);
        res.send(result.rows); // send query result as rows as a response to the client
    })
    .catch((error) => {
        console.log('error getting data', error);
        res.sendStatus(500);
    })
})

// POST request to database
listRouter.post('/', (req, res) => {
    const newTask = req.body;
    // run the query in database
    const queryText = `INSERT INTO "allTasks" ("task", "complete")
    VALUES ('${newTask.task}', 'N')`;

    // process the query
    pool.query(queryText)
    .then((result) => {
        console.log('result', result);
        res.sendStatus(201);
    })
    .catch((error) => {
        console.log('error making a query', error);
        res.sendStatus(500);
    });
});


module.exports = listRouter;