class HttpError extends Error {
   constructor(message, errorCode) {
      super(message); // add a message property to Original class
      this.code = errorCode;
   }
}

module.exports = HttpError;
