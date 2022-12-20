let express = require('express');
let listRouter = express.Router();
const pool = require('../modules/pool');

// GET request from database
listRouter.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "allTasks" ORDER BY "id" ASC;';
    pool.query(queryText)
    .then((result) => {
        console.log('results from DB', result);
        res.send(result.rows);
    })
    .catch((error) => {
        console.log('error getting data', error);
        res.sendStatus(500);
    })
})

// POST request to database
listRouter.post('/', (req, res) => {
    const newTask = req.body;
    const queryText = `INSERT INTO "allTasks" ("task", "complete")
    VALUES ($1, $2);`;

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

listRouter.delete('/:id', (req, res) => {
    const taskId = req.params.id; 
    const queryText = `DELETE FROM "allTasks" WHERE "id" = $1`;
    pool.query(queryText, [taskId])
    .then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        res.sendStatus(500);
    });
});

listRouter.put('/complete/:id', (req, res) => {
    console.log(req.params.id);
    console.log(req.body.complete);
    const complete = req.body.complete;

    let queryText = '';
    if (complete === 'Y') {
        queryText = `UPDATE "allTasks" SET "complete" = 'Y' WHERE "id" = ${req.params.id};`
    } else {
        res.sendStatus(500);
        return;
    }
    pool.query(queryText)
    .then((dbResponse) => {
        console.log('dbResponse', dbResponse);
        res.sendStatus(200);
    })
    .catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});

module.exports = listRouter;