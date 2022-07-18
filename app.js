const express = require('express');
// require returns a function call it and store in app const
const bodyParser = require('body-parser');
// ready to use middlewares to parse incoming req body

const sthRoutes = require('./routes/sth-routes');

const app = express();

app.use(bodyParser.json({ extended: false }));

app.use('/api/sth', sthRoutes);

// providing a 4 params middleware fn , by default treated as an error handling middleware
app.use((error, req, res, next) => {
   if (res.headerSent) {
      return next(error);
   }
   res.status(error.code || 500).json({
      message: error.message || 'unknown error occured',
   });
});

// generic middleware pre routing
app.use((req, res, next) => {
   next();
});

app.listen(5000);
