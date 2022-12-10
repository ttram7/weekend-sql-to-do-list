let express = require('express');
let listRouter = express.Router();
// because there is a pool.js file
const pool = require('../modules/pool');

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
    // run the query in database, sanitize inputs
    const queryText = `INSERT INTO "allTasks" ("task", "complete")
    VALUES ($1, $2);`;

    // process the query
    pool.query(queryText, [newTask.task, 'N'])
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