const express = require('express');
// require returns a function call it and store in app const

const bodyParser = require('body-parser');
// ready to use middlewares to parse incoming req body

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
   next();
});

app.listen(5000);
