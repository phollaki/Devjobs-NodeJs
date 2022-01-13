const ErrorResponse = require('../utils/ErrorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  console.log(err.name);

  if (err.name === 'CastError') {
    const message = `Badly formatted id ${err.value}`;
    error = new ErrorResponse(400, message);
  }

  if (err.name === 'TypeError') {
    const message = `Cannot found startup with id`;
    error = new ErrorResponse(400, message);
  }
  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || `Server error` });
};

module.exports = errorHandler;
