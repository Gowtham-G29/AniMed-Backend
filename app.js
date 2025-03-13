const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const compression = require('compression');
const path = require('path');

//hi

const app = express();


//Router mount
const userRouter = require('./routes/userRoutes');
const animalRouter = require('./routes/animalRoutes');
const diseaseInformationRouter = require('./routes/diseaseInformationRoutes');

if (process.env.NODE_ENV == 'development') {
    app.use(morgan('dev'));
}


//Global Middlewares

app.use(express.json());
app.use('/public', express.static(path.join(__dirname, '../public')));

const corsOptions = {
    origin: ['http://localhost:5173', 'https://chic-chebakia-065706.netlify.app'], 
    credentials: true, // Allow cookies to be sent with requests
};


app.use(cors(corsOptions));


app.use(helmet());

const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP , Please Try again later !'
});

app.use('/api', limiter);

app.use(express.json({ limit: '10kb' }));

app.use(mongoSanitize());

app.use(xss());

app.use(hpp());

app.use(compression());

app.use(express.static(`${__dirname}/public`));





//use the route as middlewares
app.use('/api/v1/users', userRouter);
app.use('/api/v1/animals', animalRouter);
app.use('/api/v1/diseaseInformation', diseaseInformationRouter);





app.all('*', (req, res) => {
    res.status(404).json({
        status: 'fail',
        message: `Can't find the ${req.originalUrl} on this Server!`
    })
});

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'Error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    })
});

module.exports = app;
