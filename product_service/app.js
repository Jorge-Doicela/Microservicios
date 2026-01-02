require('dotenv').config();
require('./src/database/index.db');

const app = require('express')();

app.use(require('express').json())
    .use('/api/products', require('./src/routes/product.route'))
    .listen(4002, () => console.log(4002));

app.use((e, r, s, n) => s.status(400).json({ error: e.message }));