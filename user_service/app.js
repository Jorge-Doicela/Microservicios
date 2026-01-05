require('dotenv').config();
require('./src/database/index.db');

const app = require('express')();

app.use(require('express').json())
    .use('/api/user', require('./src/route/user.route'))
    .listen(4001);

app.use((err, req, res, next) => res.status(400).json({ error: err.message }));