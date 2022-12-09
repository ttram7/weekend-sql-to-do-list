const express = require('express');
const app = express();
const port = 5010;

app.use(express.static('server/public'));
app.use(express.urlencoded());

// import router from routes folder
const listRouter = require('./routes/listRouter');
// ROUTES
app.use('/tasks', listRouter);

app.listen(port, () => {
    console.log('listening on port, ', port);
})
