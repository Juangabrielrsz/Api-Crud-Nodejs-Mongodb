import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { USER_ID, USER_KEY } = process.env;

const URI = `mongodb+srv://${USER_ID}:${USER_KEY}@cluster0.whzl2fx.mongodb.net/?retryWrites=true&w=majority`;
const databaseConnection = async () => {
  if (!global.mongoose) {
    mongoose.set("strictQuery", false);
    global.mongoose = await mongoose.connect(URI);
  }
};

export default databaseConnection;
