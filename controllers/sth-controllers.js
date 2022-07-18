const HttpError = require('../models/error-model');

const getSth = (req, res, next) => {
   console.log("get request route for sth's ");
   res.json({ message: 'get route' });
};

const getSthById = (req, res, next) => {
   console.log('get request route for sth by id');
   const placeId = req.params.sthid;
   if (!placeId) {
      throw HttpError('err message', 404);
   }

   //    other approach when working with async fns
   //    if (!placeId) {
   //     const error = new Error('err message');
   //     error.code = 404;
   //     next(error);
   //  }
   res.json({ message: placeId });
};

const postSth = (req, res, next) => {
   console.log('post request route for sth');
};

exports.getSth = getSth;
exports.getSthById = getSthById;
exports.postSth = postSth;
