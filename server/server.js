const express = require('express');
const app = express();
const port = 5010;

app.use(express.static('server/public'));
app.use(express.urlencoded());

//const listRouter = require('./routes/listRouter');
//app.use('/routes', listRouter);

app.listen(port, () => {
    console.log('listening on port, ', port);
})
