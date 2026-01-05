require('dotenv').config();
require('./src/database/index.db');

const app = require('express')();

app.use(require('express').json())
    .use('/api/product', require('./src/route/product.route'))
    .listen(4002);

app.use((err, req, res, next) => res.status(400).json({ error: err.message }));