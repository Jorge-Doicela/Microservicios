require('dotenv').config();
require('./src/database/index.db');

const app = require('express')();

app.use(require('express').json())
    .use('/api/users', require('./src/routes/users.route'))
    .listen(4001, () => console.log(4001));

app.use((e, r, s, n) => s.status(400).json({ error: e.message }));