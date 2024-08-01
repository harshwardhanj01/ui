import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://developer:2R56FxNjQ43pwAI2@marketminds-poc-raw-dat.ldplbur.mongodb.net/user_data");

    
    
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
};
