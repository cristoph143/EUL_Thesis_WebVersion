const express = require('express');

const bodyParser = require('body-parser');

// routes
const authRoutes = require('./routes/auth');
const accountRoutes = require('./routes/account');
// const researchRoutes = require('./routes/research');

const errorController = require('./controller/error');

const app = express();

const ports = process.env.PORT || 3000;

app.use(bodyParser.json());

const cors = require('cors');


app.use(cors({
    origin: '*',
    credentials: true,
    // list of cors specific 
    optionsSuccessStatus: 200,

}));

app.use('/auth', authRoutes);

app.use('/api/account', accountRoutes);
// app.use('/api/research', researchRoutes);

app.use(errorController.get404);

app.use(errorController.get500);

app.listen(ports, () => console.log(`listening on port ${ports}`));