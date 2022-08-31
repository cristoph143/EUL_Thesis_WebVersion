const express = require('express');

const bodyParser = require('body-parser');

// routes
const authRoutes = require('./routes/auth');
// const accountRoutes = require('./routes/account');
// const researchRoutes = require('./routes/research');

const errorController = require('./controller/error');

const app = express();

const ports = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, X-Custom-Header, Authorization');
    next();
});

app.use('/auth', authRoutes);

// app.use('/api/account', accountRoutes);
// app.use('/api/research', researchRoutes);

app.use(errorController.get404);

app.use(errorController.get500);

app.listen(ports, () => console.log(`listening on port ${ports}`));