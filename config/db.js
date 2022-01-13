const mongoose = require('mongoose');

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO);

  console.log(`Connected to MongoDB`.cyan.bold.underline);
};

module.exports = connectDB;
