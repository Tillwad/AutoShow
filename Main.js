const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const Router = require('./Router');

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());

// Database
const db = mysql.createConnection({
    host: 'dpg-chkfrl64dadfmskdlu6g-a',
    user: 'user',
    password: 'tFfTZTQdujftoXtTYhQcUMhbYjtV8LRS',
    database: 'app_v5c8'
});

db.connect(function (err) {
    console.log('Successful Connection!')
    if (err) {
        console.log('DB error');
        throw err;
        return false;
    }
});

const sessionStore = new MySQLStore({
    expiration: 604800000,
    endConnectionOnClose: false
}, db);

app.use(session({
    key: 'dghaoisdvhdvdlfkhs',
    secret: 'reikghbldsfjansgbsd',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 604800000,
        httpOnly: false
    }
}));

new Router(app, db);

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT);