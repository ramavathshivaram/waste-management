const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const URI =
      process.env.MONGO_URI || "mongodb://localhost:27017/wasteManagement";
    const conn = await mongoose.connect(URI, {
      maxPoolSize: 10,
      minPoolSize: 2,
      retryWrites: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
