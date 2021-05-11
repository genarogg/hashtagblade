const mongoose = require("mongoose");

const connectDB = (cb) => {
  mongoose.Promise = global.Promise;

  mongoose.connect(
    process.env.MONGODB,
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    },
    cb
  );
};

module.exports = { connectDB };
