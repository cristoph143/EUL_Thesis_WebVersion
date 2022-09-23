const express = require('express');
var path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
var multer = require('multer');
const app = express();
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

// routes
const authRoutes = require('./routes/auth');
const accountRoutes = require('./routes/account');
const researchRoutes = require('./routes/research');
const fileRoutes = require('./routes/file');

const errorController = require('./controller/error');

const ports = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(cors({
    origin: '*',
    credentials: true,
    // list of cors specific 
    optionsSuccessStatus: 200,
}));

// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// serving static files
// app.use('/uploads', express.static('uploads'));


// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));


app.use('/auth', authRoutes);
app.use('/api/account', accountRoutes);
app.use('/api/research', researchRoutes);
// app.use('/file', fileRoutes);


app.use(errorController.get404);
app.use(errorController.get500);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.render('index');
});

app.listen(ports, () => console.log(`listening on port ${ports}`));