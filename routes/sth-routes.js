const express = require('express');
const sthControllers = require('../controllers/sth-controllers');

const router = express.Router();

router.get('/', sthControllers.getSth);

router.get('/:sthid', sthControllers.getSthById);

router.post('/', sthControllers.postSth);

module.exports = router;
