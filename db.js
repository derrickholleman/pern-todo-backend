const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    // password stored in conf file
    host: 'localhost',
    database: 'pernstack-todos',
    port: 5432
})

module.exports = pool;