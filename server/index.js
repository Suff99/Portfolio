require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.port || 3001;
const passport = require('passport')
const session = require('express-session');
const mongoose = require('mongoose')


const db = require('./util/database/database')
const mod = require('./util/mod.js')

const DiscordStrat = require('./strategies/discordstrategy');
const MongoStore = require('connect-mongo');
const cors = require('cors')
const isDev = require('./util');
const bodyParser = require("body-parser");

db.then(() => console.log('Connected to MongoDB')).catch(err => console.log(err));

app.use(cors({ credentials: true, origin: true }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    secret: process.env.COOKIE,
    name: 'mc-craig-cookie',
    cookie: {
        maxAge: 6000 * 60 * 24
    },
    resave: true,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB })
}))

app.use(passport.initialize());
app.use(passport.session());

// Routes
const authRoute = require('./routes/auth');
const dashboardRoute = require('./routes/dashboard');

// Middleware Routes
app.use('/auth', authRoute);
app.use('/dashboard', dashboardRoute);

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.listen(port, () => {
    console.log('Listening on ' + port)
})

