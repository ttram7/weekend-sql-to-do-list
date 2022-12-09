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
    let queryText = 'SELECT * FROM allTasks;';
    pool.query(queryText)
    .then((result) => {
        console.log('results from DB', result);
        res.send(result.rows)
    })
    .catch((error) => {
        console.log('error making a query', error);
        res.sendStatus(500);
    })
    console.log('GET request from server');
})

// POST request to database
listRouter.post('/', (req, res) => {
    const queryText = `INSERT INTO allTasks ("task", "complete")
    VALUES ()`
})


module.exports = listRouter;