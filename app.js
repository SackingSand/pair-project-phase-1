const express = require('express');
const session = require(`express-session`)

const app = express();
const PORT = process.env.PORT || 6969;
const router = require('./routers');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(session({
    secret: 'digging',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))
app.use(router);

app.listen(PORT, () => console.log(`Digging start at sites:${PORT}`));