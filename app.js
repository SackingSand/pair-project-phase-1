const express = require('express');
const app = express();
const PORT = process.env.PORT || 6969;
const router = require('./routers');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use(router);

app.listen(PORT, () => console.log(`Digging start at sites:${PORT}`));