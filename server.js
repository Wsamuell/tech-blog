const express = require('express');
const routes = require('./controllers/api');
const sequelize = require('./config/connection');
const path = require('path');
const session = require('express-session');
const SequelizeStore = require("connect-session-sequelize")(session.Store);


const sess = {
    secret: 'Llama toes',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
        checkExpirationInterval: 15 * 60 * 1000,
        expiration: 24 * 60 * 60 * 1000
    })
};


const app = express();
const PORT = process.env.PORT || 3001;


app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


// app.use(routes);

sequelize.sync ({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening on port 3001!'));
})