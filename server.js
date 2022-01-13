const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const startups = require('./routes/startups');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

dotenv.config({ path: './config/config.env' });

const app = express();

app.use(express.json());

connectDB();

app.use('/api/startups', startups);

app.use(errorHandler);

const PORT = process.env.PORT || 5001;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
      .underline
  )
);

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error ${err.message}`.red.bold);
  server.close(() => process.exit(1));
});
