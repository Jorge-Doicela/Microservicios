require('dotenv').config();
require('./src/database/index.db');

const app = require('express')();

app.use(require('express').json())
    .use('/api/orders', require('./src/routes/order.route'))
    .listen(4003, () => console.log(4003));

app.use((e, r, s, n) => s.status(400).json({ error: e.message }));