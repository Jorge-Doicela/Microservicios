//user_service/src/database/index.db.js
const { Pool } = require('pg');

const pool = new Pool();

module.exports = pool;