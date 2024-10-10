const express = require('express');
const app = express();
const path = require('path');
const connectMongooseDb = require('./connection');
const cookieParser = require('cookie-parser')
const URL = require('./models/url');

const urlRoute = require('./routes/url');
const staticRoute = require('./routes/static');
const userRoute = require('./routes/user');
const { restrictToLoggedInUserOnly, checkAuth } = require('./middlewares/auth');

PORT = 8000;

//Connecting to MongoDB
connectMongooseDb('mongodb://localhost:29000/short-url')
    .then(()=> {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log('mongodb error: ',err);
    });

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'))

//Routes
app.use('/url', restrictToLoggedInUserOnly, urlRoute);
app.use('/home', checkAuth, staticRoute);
app.use('/', userRoute);

app.listen(PORT, () => {console.log(`Server is running on http://localhost:${PORT}`)});

