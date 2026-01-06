//order_service/app.js
require('dotenv').config();
require('./src/database/index.db');

const app = require('express')();

app.use(require('express').json())
    .use('/api/order', require('./src/route/order.route'))
    .listen(4003);

app.use((err, req, res, next) => res.status(400).json({ error: err.message }));