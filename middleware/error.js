const ErrorResponse = require('../utils/ErrorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  if (err.name === 'CastError') {
    const message = `Badly formatted id ${err.value}`;
    error = new ErrorResponse(400, message);
  }

  if (err.code === 11000) {
    const message = `Duplicate value entered, name of the startup should be unique`;
    error = new ErrorResponse(400, message);
  }

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(400, message);
  }

  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || `Server error` });
};

module.exports = errorHandler;
