const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
   console.log('get request route for sth');
   res.json({ message: 'get route' });
});

router.post('/', (req, res, next) => {
   console.log('post request route for sth');
});

module.exports = router;
