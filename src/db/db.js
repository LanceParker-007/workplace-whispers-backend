import mongoose from "mongoose";
import config from "../config.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${config.MONGODB_URI}/${config.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log(`MongoDB connection failed`, error);
  }
};

export default connectDB;
