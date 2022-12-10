// import pg
const pg = require('pg');
// create Pool
const Pool = pg.Pool;

// DB connection, creates the pool that's shared by all other modules
// a pool allows for multiple simultaneous connections to the database
const pool = new Pool({
    database: 'weekend-to-do-app',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000,
});
// the pool will log when it connects to the database
pool.on('connect', () => {
    console.log('postgres is connected');
});

pool.on('error', (error) => {
    console.log('error in connecting to database:', error);
});

module.exports = pool;